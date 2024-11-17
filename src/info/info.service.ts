import { Injectable } from '@nestjs/common';
import { InfoEntity } from './info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class InfoService {
    constructor(
        @InjectRepository(InfoEntity) private infoRepository: Repository<InfoEntity>
    ) { }

    async CreateInfo(info: InfoEntity) {
        const infoMid = await this.infoRepository.findOne({
            where: {
                title: info.title
            }
        })
        if (infoMid) {
            return {
                code: 400,
                msg: "标题已存在"
            }
        }
        const res = await this.infoRepository.save(info);
        return {
            code: 200,
            msg: "创建成功",
            data: res
        }
    }

    async GetInfoList() {
        let res = await this.infoRepository.find();

        return {
            code: 200,
            msg: "获取成功",
            data: res,
            total: res.length
        }
    }

    async GetInfo(id: number) {
        const info = await this.infoRepository.findOne({
            where: {
                id: id
            }
        });
        if (!info) {
            return {
                code: 400,
                msg: "信息不存在"
            }
        } else {
            return {
                code: 200,
                msg: "获取成功",
                data: info
            }
        }
    }

    async UpdateInfo(id, info) {
        const old = await this.infoRepository.findOne({
            where: {
                id: id
            }
        });
        if (!old) {
            return {
                code: 400,
                msg: "信息不存在"
            }
        }
        const res = await this.infoRepository.save({
            ...old,
            ...info
        })
        return {
            code: 200,
            msg: "更新成功",
            data: res
        }
    }

    async DeleteInfo(id: number) {
        const res = await this.infoRepository.delete(id);
        if (res.affected === 0) {
            return {
                code: 400,
                msg: "信息不存在"
            }
        }
        return {
            code: 200,
            msg: "删除成功"
        }
    }
}
