// src/db/db.provider.ts
import { Provider } from '@nestjs/common';
import { DBEntity } from './db-entity';
import { User } from '../modules/user/entities/user.entity';
import { Artist } from '../modules/artist/entities/artist.entity';

export const DB_PROVIDER = 'DB_PROVIDER';

export const dbProvider: Provider = {
  provide: DB_PROVIDER,
  useValue: {
    users: new DBEntity<User>(),
    artists: new DBEntity<Artist>(),
  },
};
