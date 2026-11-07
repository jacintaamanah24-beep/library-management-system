
# Library Management System

## Project Overview

A Library Management System API built using NestJS, TypeScript, Prisma ORM, and PostgreSQL.

The system provides a relational database structure for managing library users, book genres, and books.

## Technologies Used

- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- Neon PostgreSQL

## Database Models

### Role
An enum defining two user roles:
- PATRON
- LIBRARIAN

### User
Stores library user information, including name, email, password, and role.

### Genre
Stores book categories such as Fiction, Romance, Technology, and Mystery.

### Book
Stores book information, including title, author, description, publication date, and genre relationship.

## Schema Decisions

The Book model references Genre through a foreign key called `genreId` instead of embedding genre information directly inside the Book model.

This design follows relational database principles and establishes a one-to-many relationship between Genre and Book.

One genre can have many books, while each book belongs to one genre.

Using a foreign key provides several advantages:

1. **Data consistency:** Every book references an existing genre.
2. **Reduced duplication:** Genre names are stored once instead of being repeated in every book record.
3. **Easy updates:** Updating a genre name does not require updating every associated book.
4. **Efficient relationships:** Books can be queried together with their associated genres.

This relational approach makes the database easier to maintain and supports data integrity.

## Database Seeding

The database is seeded with:

- 4 genres
- 15 books

The books are distributed across Fiction, Romance, Technology, and Mystery.

## Environment Configuration

Create a `.env` file inside the `api` folder and configure:

- `DATABASE_URL`
- `DIRECT_URL`

Use `.env.example` as a reference. Never commit real database credentials.

## Running the Project

Navigate into the API directory:

```bash
cd api
```

Install dependencies:

```bash
npm install
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

Start the development server:

```bash
npm run start:dev
```
