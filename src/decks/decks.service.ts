import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Deck } from './entities/deck.entity';

@Injectable()
export class DecksService {
  constructor(
    @InjectModel(Deck.name)
    private readonly deckModel: Model<Deck>,
  ) {}

  async createDeck(name: string, userId: string) {
    const deck = new this.deckModel({
      name,
      owner: new Types.ObjectId(userId),
      cards: [],
    });
    return deck.save();
  }

  async addCard(deckId: string, cardId: string, quantity: number) {
    const deck = await this.deckModel.findById(deckId).exec();
    if (!deck) throw new NotFoundException('Deck not found');

    const cardObjectId = new Types.ObjectId(cardId);

    const existing = (deck as any).cards.find(
      (c: any) => c.cardId?.toString() === cardObjectId.toString(),
    );

    if (existing) {
      // ✅ จำกัดไม่เกิน 4 ใบ/การ์ด (ถ้าจะใช้ rule นี้)
      if (existing.quantity + quantity > 4) {
        throw new BadRequestException('A card cannot exceed 4 copies in a deck');
      }
      existing.quantity += quantity;
    } else {
      if (quantity > 4) {
        throw new BadRequestException('A card cannot exceed 4 copies in a deck');
      }
      (deck as any).cards.push({ cardId: cardObjectId, quantity });
    }

    // ✅ จำกัดเด็คไม่เกิน 50 ใบ
    const total = (deck as any).cards.reduce((sum: number, c: any) => sum + c.quantity, 0);
    if (total > 50) {
      throw new BadRequestException('Deck cannot exceed 50 cards');
    }

    return deck.save();
  }
}