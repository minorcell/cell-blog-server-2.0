import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotEntity } from './bot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BotEntity])],
  providers: [BotService],
  controllers: [BotController],
  exports: [BotService]
})
export class BotModule { }
