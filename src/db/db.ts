import { User } from 'src/modules/user/entities/user.entity';
import { DBEntity } from './db-entity';

class DataBse {
  public readonly users: DBEntity<User>;
  // private artists;
  // private tracks;
  // private albums;
  // private favorites;

  constructor() {
    this.users = new DBEntity();
    // this.artists = [];
    // this.tracks = [];
    // this.albums = [];
    // this.favorites = [];
  }
}

export const db = new DataBse();
