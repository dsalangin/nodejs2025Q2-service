import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { dbProvider } from 'src/db/db.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, dbProvider],
  exports: [dbProvider],
})
export class UserModule {}
