import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class NoteService {
  private logger = new Logger(NoteService.name);
  constructor(private readonly prismaService:PrismaService) {}

  async create(createNoteDto: CreateNoteDto, userId:number ) {

   const note = await this.prismaService.note.create({
      data: {
        title: createNoteDto.title,
        body: createNoteDto.body,
        userId: userId,
      },
    });
    this.logger.log(`Note created with ID: ${note.id} for User ID: ${userId}`);
    return note
  }

  async findAll({skip, take}:{skip:number, take:number}, userId:number) {
    console.log("am here", skip, take, userId);
    const note = await this.prismaService.note.findMany({
      skip,
      take,
      where:{userId:userId}
    });

     if(!note){
          throw new NotFoundException(`Note with ID ${userId} not found`);
        }
      return note;
  }

  async findOne(id: number) {
        const note = await this.prismaService.note.findFirst({where:{id:id}});
        if(!note){
          throw new NotFoundException(`Note with ID ${id} not found`);
        }
        return note
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId:number) {
    const note = await this.prismaService.note.findFirst({where:{id:id}});
    if(!note){
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    if(note?.userId !== userId){
      throw new ForbiddenException('You are not allowed to update this note');
    }
    const update = await this.prismaService.note.update(
      {where:{id:id},
      data:updateNoteDto});
    return update;
  }

  async remove(id: number, userId:number) {
    try{
    return await this.prismaService.note.delete(
      {where:{id, userId}});
    }catch(error:unknown){
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === 'P2025'){
          throw new NotFoundException(`Note with ID ${id} not found`);
        }else if(error.code === 'P2003'){
          throw new ForbiddenException('You are not allowed to delete this note');
        }
      }
      throw error;
    }
    
  }
}
