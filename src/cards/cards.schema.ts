import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, index: true })
  nation: string;

  @Prop({ required: true })
  type: string; // "Unit" | "Order" | ...

  @Prop() grade?: number;
  @Prop() power?: number;
  @Prop() shield?: number;

  @Prop() rarity?: string;
  @Prop() effect?: string;

  @Prop() imageUrl?: string;

  @Prop({ default: false })
  isTrigger: boolean;
}

export const CardSchema = SchemaFactory.createForClass(Card);