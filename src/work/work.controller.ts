import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkEntity } from './work.entity';

@Controller('work')
export class WorkController {
    constructor(private workService: WorkService) { }

    @Post()
    async CreateWork(@Body() work: WorkEntity) {
        return await this.workService.CreateWork(work);
    }

    @Get()
    async GetWorks() {
        return await this.workService.GetWorkList();
    }

    @Get(':id')
    async GetWork(@Param('id') id: number) {
        return await this.workService.GetWorkDetail(id);
    }

    @Put()
    async UpdateWork(@Body() work: WorkEntity) {
        return await this.workService.UpdateWork(work);
    }

    @Delete(':id')
    async DeleteWork(@Param('id') id: number) {
        return await this.workService.DeleteWork(id);
    }
}
