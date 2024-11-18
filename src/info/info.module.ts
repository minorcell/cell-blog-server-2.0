import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoEntity } from './info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfoEntity])],
  providers: [InfoService],
  controllers: [InfoController],
  exports: [InfoService]
})
export class InfoModule { }
