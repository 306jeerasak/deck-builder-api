import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateCardDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  nation: string;

  @IsOptional()
  @IsString()
  clan?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  power?: number;

  @IsOptional()
  @IsString()
  rarity?: string;
}