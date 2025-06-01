import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { dbProvider } from 'src/db/db.provider';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, dbProvider],
})
export class FavoritesModule {}
