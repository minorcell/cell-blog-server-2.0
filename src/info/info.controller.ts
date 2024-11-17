import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { InfoEntity } from './info.entity';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
    constructor(private infoService: InfoService) { }

    @Post()
    async CreateInfo(@Body() info: InfoEntity) {
        return await this.infoService.CreateInfo(info);
    }

    @Get()
    async GetInfoList() {
        return await this.infoService.GetInfoList();
    }

    @Get(':id')
    async GetInfo(@Param('id') id: number) {
        return await this.infoService.GetInfo(id);
    }

    @Put(':id')
    async UpdateInfo(@Param('id') id: number, @Body() info: InfoEntity) {
        return await this.infoService.UpdateInfo(id, info);
    }

    @Delete(':id')
    async DeleteInfo(@Param('id') id: number) {
        return await this.infoService.DeleteInfo(id);
    }
}
