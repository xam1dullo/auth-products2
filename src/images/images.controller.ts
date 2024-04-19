import {
  Controller,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
  Get,
  Query,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/app.module';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadImage2(@UploadedFile() file) {
    console.log(file);
    const savedPath = await this.imagesService.saveImageToDisk(file);
    return {
      message: 'Image uploaded and saved successfully',
      path: '/static/' + savedPath,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  uploadWithCustomConfig(@UploadedFile() file) {
    console.log(file);
    return {
      message: 'File uploaded with custom configuration!',
      filePath: '/static/' + file.path,
    };
  }
  @Get('read')
  async readFile(@Query('path') filePath: string) {
    if (!filePath) {
      return 'No file path provided';
    }
    console.log({ filePath });
    const contents = await this.imagesService.readFileContents(filePath);
    return { contents };
  }
}
