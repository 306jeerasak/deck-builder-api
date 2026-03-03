import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CardDocument = Card & Document;

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  nation: string;

  @Prop({ required: true, trim: true })
  type: string; // Unit | Order

  @Prop({ required: true, min: 0 })
  grade: number;

  @Prop({ default: 0, min: 0 })
  power: number;

  @Prop({ default: 0, min: 0 })
  shield: number;

  @Prop({ default: "C" })
  rarity: string;

  @Prop({ default: "" })
  effect: string;

  @Prop({ default: "" })
  imageUrl: string;

  @Prop({ default: false })
  isTrigger: boolean;
}

export const CardSchema = SchemaFactory.createForClass(Card);