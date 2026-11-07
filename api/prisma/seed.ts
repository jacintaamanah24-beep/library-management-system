
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});
async function main() {
  // Create the four library genres
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: 'Fiction' },
      update: {},
      create: { name: 'Fiction' },
    }),
    prisma.genre.upsert({
      where: { name: 'Romance' },
      update: {},
      create: { name: 'Romance' },
    }),
    prisma.genre.upsert({
      where: { name: 'Technology' },
      update: {},
      create: { name: 'Technology' },
    }),
    prisma.genre.upsert({
      where: { name: 'Mystery' },
      update: {},
      create: { name: 'Mystery' },
    }),
  ]);

  // Create fifteen books across the four genres
  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', genreId: genres[0].id },
    { title: 'The River Between', author: 'Ngugi wa Thiong’o', genreId: genres[0].id },
    { title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie', genreId: genres[0].id },
    { title: 'The Alchemist', author: 'Paulo Coelho', genreId: genres[0].id },

    { title: 'Pride and Prejudice', author: 'Jane Austen', genreId: genres[1].id },
    { title: 'Me Before You', author: 'Jojo Moyes', genreId: genres[1].id },
    { title: 'The Notebook', author: 'Nicholas Sparks', genreId: genres[1].id },
    { title: 'Jane Eyre', author: 'Charlotte Brontë', genreId: genres[1].id },

    { title: 'Clean Code', author: 'Robert C. Martin', genreId: genres[2].id },
    { title: 'The Pragmatic Programmer', author: 'David Thomas and Andrew Hunt', genreId: genres[2].id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', genreId: genres[2].id },

    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genreId: genres[3].id },
    { title: 'Murder on the Orient Express', author: 'Agatha Christie', genreId: genres[3].id },
    { title: 'The Da Vinci Code', author: 'Dan Brown', genreId: genres[3].id },
    { title: 'Gone Girl', author: 'Gillian Flynn', genreId: genres[3].id },
  ];

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
  }

  console.log('Library seeding completed!');
  console.log(`Created ${genres.length} genres.`);
  console.log(`Created ${books.length} books.`);
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
