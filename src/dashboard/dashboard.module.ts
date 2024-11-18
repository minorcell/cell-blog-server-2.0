import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from 'src/blog/blog.module';
import { BlogEntity } from 'src/blog/blog.entity';
import { WorkModule } from 'src/work/work.module';
import { WorkEntity } from 'src/work/work.entity';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/user.entity';
import { InfoModule } from 'src/info/info.module';
import { InfoEntity } from 'src/info/info.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        BlogModule,
        BlogEntity,
        WorkModule,
        WorkEntity,
        UserModule,
        UserEntity,
        InfoModule,
        InfoEntity
    ])],
    providers: [DashboardService],
    controllers: [DashboardController]
})
export class DashboardModule { }
