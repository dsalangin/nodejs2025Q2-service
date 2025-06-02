import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { dbProvider } from 'src/db/db.provider';

@Module({
  controllers: [TrackController],
  providers: [TrackService, dbProvider],
})
export class TrackModule {}
