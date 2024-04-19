import {
  Controller,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/app.module';

@ApiTags('Image Upload')
@Controller('upload')
export class CustomConfigUploadController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiConsumes('multipart/form-data')
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
  ) {
    console.log(title, file, file.path);
    if (!file) {
      throw new Error('File is not uploaded');
    }
    return await this.imagesService.createImage({ title, path: file.path });
  }
}
