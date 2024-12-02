import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { UserModule } from './user/user.module';
import { WorkModule } from './work/work.module';
import { BlogModule } from './blog/blog.module';
import { FileModule } from './file/file.module';
import { InfoModule } from './info/info.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATA_BASE_USERNAME,
      password: process.env.DATA_BASE_PASSWORD,
      database: process.env.DATA_BASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BotModule,
    UserModule,
    WorkModule,
    BlogModule,
    FileModule,
    InfoModule,
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
