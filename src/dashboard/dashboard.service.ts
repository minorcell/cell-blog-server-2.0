import { Injectable } from '@nestjs/common';
import { BlogEntity } from 'src/blog/blog.entity';
import { WorkEntity } from 'src/work/work.entity';
import { UserEntity } from 'src/user/user.entity';
import { InfoEntity } from 'src/info/info.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(BlogEntity)
        private blogRepository: typeof BlogEntity,
        @InjectRepository(WorkEntity)
        private workRepository: typeof WorkEntity,
        @InjectRepository(UserEntity)
        private userRepository: typeof UserEntity,
        @InjectRepository(InfoEntity)
        private infoRepository: typeof InfoEntity,
    ) { }

    async GetDashboard() {
        /* TODO
            2. 博客类型 {[{type, count}], total}
            3. 前10篇博客 [{title, id, status, update_time}]
            2. 作品数量 {[{title, id, link}], total}
            3. 用户数量 {[{name, role, id}], total}
            4. 通知数量 {[{title, id, update_time}], total}
        */
    }
}
