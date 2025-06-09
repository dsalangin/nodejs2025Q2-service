import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favorite = await this.getFavorite();

    return {
      artists: await this.prisma.artist.findMany({
        where: {
          id: {
            in: favorite.artists,
          },
        },
      }),
      albums: await this.prisma.album.findMany({
        where: {
          id: {
            in: favorite.albums,
          },
        },
      }),
      tracks: await this.prisma.track.findMany({
        where: {
          id: {
            in: favorite.tracks,
          },
        },
      }),
    };
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.getFavorite();
    const updatedData = [...new Set([...favorite.artists, id])];

    const updatedFavorite = await this.prisma.favorite.update({
      where: { id: favorite.id },
      data: {
        artists: updatedData,
      },
    });

    return updatedFavorite;
  }

  async removeArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.getFavorite();
    const updatedData = favorite.artists.filter((artistId) => artistId !== id);

    await this.prisma.favorite.update({
      where: { id: favorite.id },
      data: {
        artists: updatedData,
      },
    });

    return null;
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.getFavorite();
    const updatedData = [...new Set([...favorite.albums, id])];

    const updatedFavorite = await this.prisma.favorite.update({
      where: { id: favorite.id },
      data: {
        albums: updatedData,
      },
    });

    return updatedFavorite;
  }

  async removeAlbum(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });

    if (!album) {
      throw new HttpException(
        `Album with id ${id} not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    const favorite = await this.getFavorite();
    const updatedData = favorite.albums.filter((albumId) => albumId !== id);

    await this.prisma.favorite.update({
      where: { id: favorite.id },
      data: {
        albums: updatedData,
      },
    });

    return null;
  }

  async addTrack(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException(
        `Track with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = await this.getFavorite();
    const updatedData = [...new Set([...favorite.tracks, id])];

    const updatedFavorite = await this.prisma.favorite.update({
      where: { id: favorite.id },
      data: {
        tracks: updatedData,
      },
    });

    return updatedFavorite;
  }

  async removeTrack(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException(
        `Track with id ${id} not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    const favorite = await this.getFavorite();
    const updatedData = favorite.tracks.filter((trackId) => trackId !== id);

    await this.prisma.favorite.update({
      where: { id: favorite.id },
      data: {
        tracks: updatedData,
      },
    });

    return null;
  }

  async getFavorite() {
    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      const favorite = this.prisma.favorite.create({
        data: {
          artists: [],
          albums: [],
          tracks: [],
        },
      });

      return favorite;
    }

    return favorite;
  }
}
