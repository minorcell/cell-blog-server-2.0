import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotEntity } from './bot.entity';

@Injectable()
export class BotService {
    constructor(
        @InjectRepository(BotEntity)
        private botRepository: Repository<BotEntity>,
    ) { }

    async bot(content: string) {
        let resContent = '';
        const botInfo = await this.botRepository.findOne({
            where: {
                id: 1
            }
        });

        const data = {
            "bot_id": botInfo.bot_id,
            "user_id": "123",
            "stream": true,
            "additional_messages": [
                {
                    "role": "user",
                    "content": content,
                    "content_type": "text"
                }
            ]
        };

        const response = await fetch('https://api.coze.cn/v3/chat', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + botInfo.api_key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                const text = decoder.decode(value, { stream: !done });
                const lines = text.split('\n');
                lines.forEach(line => {
                    if (line.startsWith("event:conversation.message.completed")) {
                        const dataLine = lines.find(line => line.startsWith('data:'));
                        const dataString = dataLine.substring('data:'.length);
                        const dataObject = JSON.parse(dataString);
                        if (dataObject.type == "answer") {
                            resContent = dataObject.content;
                        }
                    }
                })
            }
        }
        return resContent;
    }
    async ChatBot(content: string) {
        const resContent = await this.bot(content);
        if (resContent.length > 0) {
            return {
                code: 200,
                message: '请求成功',
                data: resContent
            }
        } else {
            return {
                code: 500,
                message: '请求失败'
            }
        }
    }

    async GetBot() {
        const bots = await this.botRepository.find();
        if (bots) {
            return {
                code: 200,
                message: '请求成功',
                data: bots
            }
        } else {
            return {
                code: 500,
                message: '请求失败'
            }
        }
    }

    async UpdateBot(data: BotEntity) {
        for (const key in data) {
            if (data[key] == null || data[key] == '' || data[key] == undefined) {
                delete data[key];
            }
        }
        data.update_time = new Date();
        await this.botRepository.update({
            id: data.id
        }, data);
        const res = await this.botRepository.findOne({
            where: {
                id: data.id
            }
        });
        if (res) {
            return {
                code: 200,
                message: '更新成功',
                data: res
            }
        } else {
            return {
                code: 500,
                message: '更新失败'
            }
        }
    }
}
