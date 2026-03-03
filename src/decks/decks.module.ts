import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Deck, DeckSchema } from "./decks.schema";
import { DecksController } from "./decks.controller";
import { DecksService } from "./decks.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }])],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule {}