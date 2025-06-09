import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  name: string;

  @IsString()
  artistId: string | null; // refers to Artist

  @IsString()
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}
