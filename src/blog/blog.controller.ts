import { Controller, Post, Get, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogEntity } from './blog.entity';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Post()
    async CreateBlog(@Body() blog: BlogEntity) {
        return await this.blogService.CreateBlog(blog);
    }

    @Get()
    async GetBlogs(
        @Query("status") status?: string,
        @Query("type") type?: string,
        @Query("page") page?: number,
        @Query("size") size?: number) {
        return await this.blogService.GetBlogs(status, type, page, size);
    }

    @Get("type")
    async GetBlogTypes() {
        return await this.blogService.GetBlogTypes();
    }

    @Get(':id')
    async GetBlog(@Param('id') id: number) {
        return await this.blogService.GetBlog(id);
    }

    @Put()
    async UpdateBlog(@Body() blog: BlogEntity) {
        return await this.blogService.UpdateBlog(blog);
    }

    @Delete(':id')
    async DeleteBlog(@Param('id') id: number) {
        return await this.blogService.DeleteBlog(id);
    }
}
