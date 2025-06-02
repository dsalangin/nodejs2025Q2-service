import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DB_PROVIDER } from 'src/db/db.provider';
import { Artist } from './entities/artist.entity';
import { DBEntity } from 'src/db/db-entity';
import { randomUUID } from 'crypto';
import { DBFavorite } from 'src/db/db-favorites';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(DB_PROVIDER)
    private db: {
      artists: DBEntity<Artist>;
      albums: DBEntity<Album>;
      tracks: DBEntity<Track>;
      favorites: DBFavorite;
    },
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = this.mapCreateDtoToEntity(createArtistDto);
    return this.db.artists.create(artist);
  }

  findAll() {
    return this.db.artists.getAll();
  }

  findOne(id: string) {
    const artist = this.db.artists.getById(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.artists.getById(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const artistData = this.mapUpdateDtoToEntity(artist, updateArtistDto);
    const updatedArtist = this.db.artists.update(id, artistData);

    return updatedArtist;
  }

  remove(id: string) {
    const deletedArtist = this.db.artists.delete(id);

    if (!deletedArtist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.db.albums.getByAttributes({ artistId: id }).forEach((album) => {
      this.db.albums.update(album.id, { ...album, artistId: null });
    });

    this.db.tracks.getByAttributes({ artistId: id }).forEach((track) => {
      this.db.tracks.update(track.id, { ...track, artistId: null });
    });

    this.db.favorites.removeArtist(id);

    return null;
  }

  private mapCreateDtoToEntity(dto: CreateArtistDto): Artist {
    return {
      id: randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };
  }

  private mapUpdateDtoToEntity(artist: Artist, dto: UpdateArtistDto): Artist {
    return {
      ...artist,
      ...dto,
    };
  }
}
