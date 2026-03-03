import { IsBoolean, IsInt, IsOptional, IsString, Min, IsUrl } from "class-validator";

export class CreateCardDto {
  @IsString()
  name: string;

  @IsString()
  nation: string;

  @IsString()
  type: string;

  @IsOptional() @IsInt() @Min(0)
  grade?: number;

  @IsOptional() @IsInt() @Min(0)
  power?: number;

  @IsOptional() @IsInt() @Min(0)
  shield?: number;

  @IsOptional() @IsString()
  rarity?: string;

  @IsOptional() @IsString()
  effect?: string;

  @IsOptional() @IsUrl()
  imageUrl?: string;

  @IsOptional() @IsBoolean()
  isTrigger?: boolean;
}