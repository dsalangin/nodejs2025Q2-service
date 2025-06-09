import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({ data: createArtistDto });

    return artist;
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany();

    return artists;
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.artist.delete({ where: { id } });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    const favorite = await this.prisma.favorite.findFirst();

    if (favorite) {
      const updatedData = favorite.artists.filter(
        (artistId) => artistId !== id,
      );

      await this.prisma.favorite.update({
        where: { id: favorite.id },
        data: {
          artists: updatedData,
        },
      });
    }

    return null;
  }
}
