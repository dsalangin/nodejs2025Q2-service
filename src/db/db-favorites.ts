import { Favorite } from 'src/modules/favorites/entities/favorite.entity';

export class DBFavorite {
  private _store: Favorite;

  constructor() {
    this._store = new Favorite();
    this._store.artists = [];
    this._store.albums = [];
    this._store.tracks = [];
  }

  public getAll(): Favorite {
    return this._store;
  }

  public addArtist(id: string) {
    return this.add('artists', id);
  }

  public removeArtist(id: string) {
    return this.remove('artists', id);
  }

  public addAlbum(id: string) {
    return this.add('albums', id);
  }

  public removeAlbum(id: string) {
    return this.remove('albums', id);
  }

  public addTrack(id: string) {
    return this.add('tracks', id);
  }

  public removeTrack(id: string) {
    return this.remove('tracks', id);
  }

  private add(entity: string, id: string) {
    if (!this._store[entity].includes(id)) {
      this._store[entity].push(id);
    }
  }

  private remove(entity: string, id: string) {
    const index = this._store[entity].indexOf(id);

    if (index === -1) {
      return null;
    }

    const item = this._store[entity].splice(index, 1);

    return item;
  }
}
