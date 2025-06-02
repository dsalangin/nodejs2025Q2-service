// src/db/db.provider.ts
import { Provider } from '@nestjs/common';
import { DBEntity } from './db-entity';
import { User } from '../modules/user/entities/user.entity';
import { Artist } from '../modules/artist/entities/artist.entity';
import { Track } from 'src/modules/track/entities/track.entity';
import { Album } from 'src/modules/album/entities/album.entity';
import { DBFavorite } from './db-favorites';

export const DB_PROVIDER = 'DB_PROVIDER';

export const dbProvider: Provider = {
  provide: DB_PROVIDER,
  useValue: {
    users: new DBEntity<User>(),
    artists: new DBEntity<Artist>(),
    albums: new DBEntity<Album>(),
    tracks: new DBEntity<Track>(),
    favorites: new DBFavorite(),
  },
};
