import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await (this.$connect as () => Promise<void>)();
    } catch (error) {
      console.error('Connection error', error);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    try {
      await (this.$disconnect as () => Promise<void>)();
    } catch (error) {
      console.error('Disconnection error', error);
    }
  }
}
