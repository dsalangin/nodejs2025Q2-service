import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.prisma.album.create({ data: createAlbumDto });

    return album;
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });

    return updatedAlbum;
  }

  async remove(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.album.delete({ where: { id } });

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    const favorite = await this.prisma.favorite.findFirst();

    if (favorite) {
      const updatedData = favorite.albums.filter((albumId) => albumId !== id);

      await this.prisma.favorite.update({
        where: { id: favorite.id },
        data: {
          albums: updatedData,
        },
      });
    }

    return null;
  }
}
