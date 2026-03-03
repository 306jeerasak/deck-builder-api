import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Card, CardDocument } from "./cards.schema";
import { CreateCardDto } from "./dto/create-card.dto";

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  create(dto: CreateCardDto) {
    return this.cardModel.create(dto);
  }

  createMany(dtos: CreateCardDto[]) {
    return this.cardModel.insertMany(dtos);
  }

  findAll(nation?: string) {
    const q: any = {};
    if (nation) q.nation = nation;
    return this.cardModel.find(q).sort({ createdAt: -1 }).exec();
  }
}