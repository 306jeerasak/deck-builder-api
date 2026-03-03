// ในไฟล์ decks.service.ts
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"; // เพิ่ม BadRequestException
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Deck } from "./schemas/deck.schema";

@Injectable()
export class DecksService {
  constructor(@InjectModel("Deck") private deckModel: Model<Deck>) {}

  async createDeck(name: string, userId: string) {
    const d = new this.deckModel({
      name,
      owner: new Types.ObjectId(userId),
      cards: [],
    });
    return d.save();
  }

  async getMyDecks(userId: string) {
    return this.deckModel.find({ owner: new Types.ObjectId(userId) }).lean();
  }

  async getDeckDetail(deckId: string, userId: string) {
    const deck = await this.deckModel
      .findOne({ 
        _id: new Types.ObjectId(deckId), 
        owner: new Types.ObjectId(userId) 
      })
      .lean();

    if (!deck) throw new NotFoundException("ไม่พบเด็คที่คุณต้องการ");
    return deck;
  }

  async addCard(
    deckId: string,
    cardId: string,
    quantity: number,
    userId: string
  ) {
    console.log(`Updating Card: ${cardId} in Deck: ${deckId} (Adjustment: ${quantity})`);

    const deck = await this.deckModel.findOne({
      _id: new Types.ObjectId(deckId),
      owner: new Types.ObjectId(userId),
    });

    if (!deck) {
      throw new NotFoundException("ไม่พบเด็คของคุณ หรือคุณไม่มีสิทธิ์แก้ไขเด็คนี้");
    }

    // 1. ค้นหาการ์ดเดิมในเด็ค
    const existingIndex = deck.cards.findIndex(
      (c: any) => c.cardId.toString() === cardId.toString()
    );

    if (existingIndex > -1) {
      // 2. ถ้ามีการ์ดอยู่แล้ว ให้บวกลบจำนวนตามที่ส่งมา
      const newQuantity = deck.cards[existingIndex].quantity + quantity;

      if (newQuantity > 4) {
        throw new BadRequestException("ใส่การ์ดใบนี้ได้สูงสุด 4 ใบ");
      }

      if (newQuantity <= 0) {
        // 3. ถ้าลดจนเหลือ 0 ให้ลบการ์ดใบนั้นออกจากเด็คเลย
        deck.cards.splice(existingIndex, 1);
      } else {
        deck.cards[existingIndex].quantity = newQuantity;
      }
    } else {
      // 4. ถ้ายังไม่มีการ์ด และต้องการเพิ่ม (quantity ต้องเป็นบวก)
      if (quantity > 0) {
        deck.cards.push({
          cardId: new Types.ObjectId(cardId),
          quantity: quantity,
        });
      }
    }

    await deck.save();

    // คืนค่าเด็คที่อัปเดตแล้ว
    return this.deckModel.findById(deckId).lean();
  }
}