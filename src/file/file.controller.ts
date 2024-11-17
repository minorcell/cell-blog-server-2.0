import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const fileName = uuidv4() + path.extname(file.originalname);
                    callback(null, fileName);
                },
            }),
        }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const existingFile = await this.fileService.findFileByNameAndSize(file.originalname, file.size);

        if (existingFile) {
            return existingFile;
        }
        return this.fileService.saveFile(file);
    }
}
