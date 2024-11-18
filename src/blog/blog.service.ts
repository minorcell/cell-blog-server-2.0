import { Injectable } from '@nestjs/common';
import { BlogEntity } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotService } from 'src/bot/bot.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>,
        private readonly botService: BotService
    ) { }

    async CreateBlog(blog: BlogEntity) {
        const old = await this.blogRepository.findOne({
            where: {
                title: blog.title
            }
        })

        if (old) {
            return {
                code: 400,
                msg: '博客名已存在'
            }
        }
        console.log(blog.intro);
        const res = await this.botService.ChatBot("这是我的文章简介，但是写的不够好，请你帮我进行优化，只返回优化后的内容：" + blog.intro);
        blog.intro = res.data;
        return await this.blogRepository.save(blog);
    }

    async GetBlogs(status?: string, type?: string, page?: number, size?: number) {
        page = page ? page : 1;
        size = size ? size : 10;
        const skip = (page - 1) * size;

        let res;
        const queryBuilder = this.blogRepository.createQueryBuilder('blog')
            .orderBy('blog.update_time', 'DESC');

        if (status && type) {
            res = await queryBuilder.where('blog.status = :status', { status })
                .andWhere('blog.type = :type', { type })
                .skip(skip)
                .take(size)
                .getMany();
        } else if (status) {
            res = await queryBuilder.where('blog.status = :status', { status })
                .skip(skip)
                .take(size)
                .getMany();
        } else if (type) {
            res = await queryBuilder.where('blog.type = :type', { type })
                .skip(skip)
                .take(size)
                .getMany();
        } else {
            res = await queryBuilder.skip(skip)
                .take(size)
                .getMany();
        }

        const total = await queryBuilder.getCount();

        res.forEach((item) => {
            delete item.content;
        })

        return {
            code: 200,
            msg: '获取成功',
            data: res,
            total: total,
            page: page,
            size: size,
            type: type ? type : 'all',
            status: status ? status : 'all'
        }
    }

    async GetBlogTypes() {
        let res = []

        const types = await this.blogRepository.createQueryBuilder('blog')
            .select('blog.type', 'type')
            .addSelect('COUNT(blog.type)', 'count')
            .groupBy('blog.type')
            .getRawMany();

        res = res.concat(types);

        return {
            code: 200,
            msg: '获取成功',
            data: res,
            length: res.length
        }
    }

    async GetBlog(id: number) {
        const blog = await this.blogRepository.findOne({
            where: {
                id: id
            }
        });
        if (!blog) {
            return {
                code: 400,
                msg: '博客不存在'
            }
        } else {
            blog.looks++;
            await this.blogRepository.save(blog);
            return {
                code: 200,
                msg: '获取成功',
                data: blog
            }
        }
    }

    async UpdateBlog(blog: BlogEntity) {
        const old = await this.blogRepository.findOne({
            where: {
                id: blog.id
            }
        });

        if (!old) {
            return {
                code: 400,
                msg: '博客不存在，无法更新'
            }
        }
        if (blog.intro !== old.intro) {
            const res = await this.botService.ChatBot("这是我的文章简介，但是写的不够好，请你帮我进行优化，只返回优化后的内容：" + blog.intro);
            blog.intro = res.data;
        }

        blog.update_time = new Date();
        await this.blogRepository.update(blog.id, blog);
        const newBlog = await this.blogRepository.findOne({
            where: {
                id: blog.id
            }
        })
        return {
            code: 200,
            msg: '更新成功',
            data: newBlog
        }
    }

    async DeleteBlog(id: number) {
        const res = await this.blogRepository.delete({
            id: id
        });

        if (res.affected == 0) {
            return {
                code: 400,
                msg: '博客不存在，无法删除'
            }
        } else {
            return {
                code: 200,
                msg: '删除成功'
            }
        }
    }
}
