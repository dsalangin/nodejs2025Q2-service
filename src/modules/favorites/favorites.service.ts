import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DBEntity } from 'src/db/db-entity';
import { DBFavorite } from 'src/db/db-favorites';
import { DB_PROVIDER } from 'src/db/db.provider';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(DB_PROVIDER)
    private db: {
      favorites: DBFavorite;
      artists: DBEntity<Artist>;
      albums: DBEntity<Album>;
      tracks: DBEntity<Track>;
    },
  ) {}

  findAll() {
    return this.getEntities();
  }

  addArtist(id: string) {
    const artist = this.db.artists.getById(id);

    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.addArtist(id);
  }

  removeArtist(id: string) {
    const artist = this.db.artists.getById(id);

    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.favorites.removeArtist(id);

    return null;
  }

  addAlbum(id: string) {
    const album = this.db.albums.getById(id);

    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.addAlbum(id);
  }

  removeAlbum(id: string) {
    const album = this.db.albums.getById(id);

    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.favorites.removeAlbum(id);

    return null;
  }

  addTrack(id: string) {
    const track = this.db.tracks.getById(id);

    if (!track) {
      throw new HttpException(
        `Track with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.db.favorites.addTrack(id);
  }

  removeTrack(id: string) {
    const track = this.db.tracks.getById(id);

    if (!track) {
      throw new HttpException(
        `Track with id ${id} not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.favorites.removeTrack(id);

    return null;
  }

  getEntities() {
    const result = {};

    Object.keys(this.db.favorites.getAll()).forEach((entity) => {
      result[entity] = this.db.favorites.getAll()[entity].reduce((acc, id) => {
        const item = this.db[entity].getById(id);

        if (!item) {
          return acc;
        }

        acc.push(item);

        return acc;
      }, []);
    });

    return result;
  }
}
