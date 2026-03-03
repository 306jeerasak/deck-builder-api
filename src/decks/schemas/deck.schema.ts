import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Deck {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, required: true })
  owner: Types.ObjectId;

  @Prop({
    type: [
      {
        cardId: { type: Types.ObjectId, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  })
  cards: { cardId: Types.ObjectId; quantity: number }[];

  // ✅ สำหรับแชร์เด็ค (public)
  @Prop({ unique: true, sparse: true })
  shareId?: string;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);