import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { dbProvider } from 'src/db/db.provider';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, dbProvider],
})
export class ArtistModule {}
