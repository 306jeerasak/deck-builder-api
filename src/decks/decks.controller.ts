import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DecksService } from './decks.service';
import { AddCardDto } from './dto/add-card.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createDeck(@Body('name') name: string, @Req() req: any) {
    return this.decksService.createDeck(name, req.user.sub);
  }

  @Post(':id/cards')
  @UseGuards(AuthGuard('jwt'))
  addCardToDeck(@Param('id') id: string, @Body() dto: AddCardDto) {
    return this.decksService.addCard(id, dto.cardId, dto.quantity);
  }
}