import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), BotModule],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule { }
