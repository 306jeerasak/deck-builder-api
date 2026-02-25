import { IsString, IsNumber, Min } from 'class-validator';

export class AddCardDto {
  @IsString()
  cardId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}