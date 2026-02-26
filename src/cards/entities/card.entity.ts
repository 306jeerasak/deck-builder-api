import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Card extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  nation: string; // เช่น "Dark States"

  @Prop()
  clan: string;

  @Prop()
  power: number;

  @Prop()
  rarity: string;

  @Prop()
  imageUrl: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);