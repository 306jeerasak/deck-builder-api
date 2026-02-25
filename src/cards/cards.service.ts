import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<Card>,
  ) {}

  async create(dto: CreateCardDto) {
    const created = new this.cardModel(dto);
    return created.save();
  }

  async findAll() {
    return this.cardModel.find().sort({ createdAt: -1 }).exec();
  }
}