import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CardsModule } from "./cards/cards.module";
import { DecksModule } from "./decks/decks.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>("MONGODB_URI"),
      }),
    }),
    UsersModule,
    AuthModule,
    CardsModule,
    DecksModule,
  ],
})
export class AppModule {}