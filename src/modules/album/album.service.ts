import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DB_PROVIDER } from 'src/db/db.provider';
import { DBEntity } from 'src/db/db-entity';
import { Album } from './entities/album.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(DB_PROVIDER)
    private db: { albums: DBEntity<Album> },
  ) {}
  create(createAlbumDto: CreateAlbumDto) {
    const album = this.mapCreateDtoToEntity(createAlbumDto);
    return this.db.albums.create(album);
  }

  findAll() {
    return this.db.albums.getAll();
  }

  findOne(id: string) {
    const album = this.db.albums.getById(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.albums.getById(id);

    if (!album) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const artistData = this.mapUpdateDtoToEntity(album, updateAlbumDto);
    const updatedArtist = this.db.albums.update(id, artistData);

    return updatedArtist;
  }

  remove(id: string) {
    const deletedAlbum = this.db.albums.delete(id);

    if (!deletedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return null;
  }

  private mapCreateDtoToEntity(dto: CreateAlbumDto): Album {
    return {
      id: randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };
  }

  private mapUpdateDtoToEntity(album: Album, dto: UpdateAlbumDto): Album {
    return {
      ...album,
      ...dto,
    };
  }
}
