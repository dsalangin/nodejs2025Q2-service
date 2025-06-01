import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DB_PROVIDER } from 'src/db/db.provider';
import { DBEntity } from 'src/db/db-entity';
import { Track } from './entities/track.entity';
import { randomUUID } from 'crypto';
import { DBFavorite } from 'src/db/db-favorites';

@Injectable()
export class TrackService {
  constructor(
    @Inject(DB_PROVIDER)
    private db: { tracks: DBEntity<Track>; favorites: DBFavorite },
  ) {}
  create(createTrackDto: CreateTrackDto) {
    const album = this.mapCreateDtoToEntity(createTrackDto);
    return this.db.tracks.create(album);
  }

  findAll() {
    return this.db.tracks.getAll();
  }

  findOne(id: string) {
    const album = this.db.tracks.getById(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.tracks.getById(id);

    if (!track) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const trackData = this.mapUpdateDtoToEntity(track, updateTrackDto);
    const updatedTrack = this.db.tracks.update(id, trackData);

    return updatedTrack;
  }

  remove(id: string) {
    const deletedTrack = this.db.tracks.delete(id);

    if (!deletedTrack) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    this.db.favorites.removeTrack(id);

    return null;
  }

  private mapCreateDtoToEntity(dto: CreateTrackDto): Track {
    return {
      id: randomUUID(),
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration,
    };
  }

  private mapUpdateDtoToEntity(track: Track, dto: UpdateTrackDto): Track {
    return {
      ...track,
      ...dto,
    };
  }
}
