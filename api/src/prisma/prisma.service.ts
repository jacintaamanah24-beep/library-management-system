
import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DIRECT_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to PostgreSQL successfully!');
  }
}
