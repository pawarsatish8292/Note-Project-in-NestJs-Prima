# Notes API

A RESTful Notes API built with NestJS and Prisma ORM. This project allows users to register, log in, and manage personal notes. Notes are linked to users, and only the owner can modify or delete their notes. Passwords are securely hashed using bcrypt.

## Features

- User registration and authentication
- Create, read, update, and delete notes
- Notes are associated with users (ownership enforced)
- Secure password hashing
- Error handling for forbidden and not found actions

## Tech Stack

- [NestJS](https://nestjs.com/) – Node.js framework
- [Prisma ORM](https://www.prisma.io/) – Database ORM
- [SQLite](https://www.sqlite.org/) – Development database
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) – Password hashing

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/pawarsatish8292/Note-Project-in-NestJs-Prima.git
   cd notes-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up the database:
   - Edit `.env` if needed (default uses SQLite).
   - Run Prisma migrations:
     ```sh
     npx prisma migrate dev --name init
     ```

4. Start the server:
   ```sh
   npm run start
   ```

## API Endpoints

### Auth

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Log in and receive a token

### Notes

- `GET /notes` – List all notes for the authenticated user
- `GET /notes/:id` – Get a specific note
- `POST /notes` – Create a new note
- `PUT /notes/:id` – Update a note (owner only)
- `DELETE /notes/:id` – Delete a note (owner only)

## Project Structure

```
src/
  auth/         # Authentication logic
  note/         # Notes CRUD logic
  user/         # User management
  prisma.service.ts # Prisma database service
prisma/
  schema.prisma # Prisma schema
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

SP
