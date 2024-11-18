import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogEntity } from 'src/blog/blog.entity';
import { UserEntity } from 'src/user/user.entity';
import { WorkEntity } from 'src/work/work.entity';
import { InfoEntity } from 'src/info/info.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(BlogEntity)
        private blogRepository: Repository<BlogEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(WorkEntity)
        private workRepository: Repository<WorkEntity>,
        @InjectRepository(InfoEntity)
        private infoRepository: Repository<InfoEntity>,
    ) { }

    async GetDashboard() {
        const blogType = await this.blogRepository.createQueryBuilder('blog')
            .select('blog.type', 'type')
            .addSelect('COUNT(blog.id)', 'count')
            .groupBy('blog.type')
            .getRawMany();

        const blogList = await this.blogRepository.find({
            order: {
                update_time: 'DESC'
            },
            take: 4
        });

        blogList.forEach((item) => {
            delete item.content;
            delete item.intro;
        });

        const workList = await this.workRepository.find({
            order: {
                update_time: 'DESC'
            },
            take: 4
        });
        workList.forEach((item) => {
            delete item.intro;
        });

        const infoList = await this.infoRepository.find({
            order: {
                update_time: 'DESC'
            },
            take: 1
        });

        // 获取博客数量
        const blogCount = await this.blogRepository.count();
        // 获取用户数量
        const userCount = await this.userRepository.count();
        // 获取作品数量
        const workCount = await this.workRepository.count();
        // 获取信息数量
        const infoCount = await this.infoRepository.count();

        return {
            code: 200,
            message: '仪表盘数据获取成功',
            data: {
                blog_type: blogType,
                recent_blog: blogList,
                recent_work: workList,
                recent_info: infoList,
                counts: {
                    blog: blogCount,
                    user: userCount,
                    work: workCount,
                    info: infoCount
                }
            }
        };
    }
}
