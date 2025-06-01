import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  // @ValidateIf((dto) => dto.artistId !== null)
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
}
