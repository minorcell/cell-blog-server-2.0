import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from './bot.service';

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
}
