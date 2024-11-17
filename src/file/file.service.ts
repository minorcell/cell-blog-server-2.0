import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import * as path from 'path';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>,
    ) { }

    async findFileByNameAndSize(name: string, size: number): Promise<FileEntity | undefined> {
        return this.fileRepository.findOne({
            where: { name, size },
        });
    }

    async saveFile(file: Express.Multer.File): Promise<FileEntity> {
        const baseUrl = process.env.BASE_URL || '';
        const filePath = path.join('uploads', file.filename);
        const fullUrl = `${baseUrl}/${file.filename}`;

        const newFile = new FileEntity();
        newFile.name = file.originalname;
        newFile.type = file.mimetype;
        newFile.size = file.size;
        newFile.part_url = filePath;
        newFile.full_url = fullUrl;

        return this.fileRepository.save(newFile);
    }

    async handleFileUpload(file: Express.Multer.File) {
        const existingFile = await this.findFileByNameAndSize(file.originalname, file.size);

        if (existingFile) {
            return existingFile;
        }

        return this.saveFile(file);
    }
}
