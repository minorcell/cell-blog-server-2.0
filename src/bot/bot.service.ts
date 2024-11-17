import { Injectable } from '@nestjs/common';

@Injectable()
export class BotService {

    async bot(content: string) {
        let resContent = '';
        const data = {
            "bot_id": process.env.BOT_ID,
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
                'Authorization': 'Bearer ' + process.env.COZE_API_KEY,
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
}
