
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  author: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  publishedAt?: Date;

  @IsInt()
  @Min(1)
  genreId: number;
}
