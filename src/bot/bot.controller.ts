import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotEntity } from './bot.entity';

type payload = {
    content: string;
}
@Controller('bot')
export class BotController {
    constructor(private readonly botService: BotService) { }

    @Post()
    async CreateBot(@Body() payload: payload) {
        return await this.botService.ChatBot(payload.content);
    }

    @Get()
    async GetBot() {
        return await this.botService.GetBot();
    }

    @Put()
    async UpdateBot(@Body() data: BotEntity) {
        return await this.botService.UpdateBot(data);
    }
}
