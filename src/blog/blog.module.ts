import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule { }
