
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  // CREATE a new genre
  async create(name: string) {
    return this.prisma.genre.create({
      data: { name },
    });
  }

  // READ all genres
  async findAll() {
    return this.prisma.genre.findMany({
      include: { books: true },
    });
  }

  // READ one genre by ID
  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  // UPDATE a genre
  async update(id: number, name: string) {
    await this.findOne(id);

    return this.prisma.genre.update({
      where: { id },
      data: { name },
    });
  }

  // DELETE a genre
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
