import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/app.module';

@ApiTags('Image Upload')
@Controller('images')
export class CustomConfigUploadController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadImage2(@UploadedFile() file) {
    console.log(file);
    const savedPath = await this.imagesService.saveImageToDisk(file);
    return {
      message: 'Image uploaded and saved successfully',
      path: 'http://45.138.158.252:3000/static/' + savedPath,
    };
  }
}
