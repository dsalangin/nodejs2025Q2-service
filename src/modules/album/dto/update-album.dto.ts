import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}
