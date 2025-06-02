import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { dbProvider } from 'src/db/db.provider';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, dbProvider],
})
export class AlbumModule {}
