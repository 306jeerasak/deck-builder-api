import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";

@Controller("cards")
@UseGuards(AuthGuard("jwt"))
export class CardsController {
  constructor(private cards: CardsService) {}

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cards.create(dto);
  }

  // ✅ ใส่ทีละหลายใบ
  @Post("bulk")
  bulk(@Body() dtos: CreateCardDto[]) {
    return this.cards.createMany(dtos);
  }

  @Get()
  findAll(@Query("nation") nation?: string) {
    return this.cards.findAll(nation);
  }
}