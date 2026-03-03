import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DeckDocument = HydratedDocument<Deck>;

@Schema({ _id: false })
export class DeckCardItem {
  @Prop({ type: Types.ObjectId, ref: "Card", required: true })
  cardId: Types.ObjectId;

  @Prop({ default: 1 })
  quantity: number;
}

const DeckCardItemSchema = SchemaFactory.createForClass(DeckCardItem);

@Schema({ timestamps: true })
export class Deck {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  owner: Types.ObjectId;

  @Prop({ type: [DeckCardItemSchema], default: [] })
  cards: DeckCardItem[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);