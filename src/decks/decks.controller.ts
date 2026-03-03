import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DecksService } from "./decks.service";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("Decks") // 🔥 ให้ขึ้นใน Swagger
@ApiBearerAuth()  // 🔥 ให้ใช้ปุ่ม Authorize
@Controller("decks")
@UseGuards(AuthGuard("jwt"))
export class DecksController {
  constructor(private readonly decks: DecksService) {}

  @Post()
  @ApiOperation({ summary: "สร้างเด็คใหม่" })
  createDeck(@Body("name") name: string, @Req() req: any) {
    return this.decks.createDeck(name, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: "ดึงเด็คทั้งหมดของ user" })
  getMyDecks(@Req() req: any) {
    return this.decks.getMyDecks(req.user.sub);
  }

  @Get(":id")
  @ApiOperation({ summary: "ดึงรายละเอียดเด็ค (populate การ์ด)" })
  getDeck(@Param("id") id: string, @Req() req: any) {
    return this.decks.getDeckDetail(id, req.user.sub);
  }

  @Post(":id/cards")
  @ApiOperation({ summary: "เพิ่ม/ลด การ์ดในเด็ค" })
  addCard(
    @Param("id") id: string,
    @Body("cardId") cardId: string,
    @Body("quantity") quantity: number,
    @Req() req: any
  ) {
    return this.decks.addCard(
      id,
      cardId,
      quantity ?? 1,
      req.user.sub
    );
  }
}