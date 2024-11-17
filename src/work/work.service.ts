import { Injectable } from '@nestjs/common';
import { WorkEntity } from './work.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(WorkEntity)
        private workRepository: Repository<WorkEntity>,
    ) { }

    async CreateWork(work: WorkEntity) {
        const res = await this.workRepository.findOne({
            where: {
                name: work.name
            }
        })

        if (res) {
            return {
                code: 400,
                message: '作品名已存在'
            }
        }
        const result = await this.workRepository.save(work);

        return {
            code: 200,
            message: '作品创建成功',
            data: result
        }
    }

    async GetWorkList() {
        const res = await this.workRepository.find();

        return {
            code: 200,
            message: '作品列表获取成功',
            data: res,
            total: res.length
        }
    }

    async UpdateWork(work: WorkEntity) {
        if (!work.id) {
            return {
                code: 400,
                message: '作品id不能为空'
            }
        }
        const workInfo = await this.workRepository.findOne({
            where: {
                id: work.id
            }
        })

        if (!workInfo) {
            return {
                code: 400,
                message: '作品不存在'
            }
        }

        await this.workRepository.update(work.id, work);

        const res = await this.workRepository.findOne({
            where: {
                id: work.id


            }
        })

        return {
            code: 200,
            message: '作品更新成功',
            data: res
        }
    }

    async DeleteWork(id: number) {
        const workInfo = await this.workRepository.findOne({
            where: {
                id: id
            }
        })

        if (!workInfo) {
            return {
                code: 400,
                message: '作品不存在'
            }
        }

        await this.workRepository.delete(id);

        return {
            code: 200,
            message: '作品删除成功'
        }
    }
}