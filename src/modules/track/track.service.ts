import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.prisma.track.create({ data: createTrackDto });

    return track;
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();

    return tracks;
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.track.delete({ where: { id } });

    return null;
  }
}
