import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { title } from 'process';
import * as fs from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { writeFile } from 'fs/promises';

const readFile = promisify(fs.readFile);
@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async createImage(data: { title: string; path: string }) {
    console.log(data);
    return title;
  }
  async readFileContents(path: string): Promise<string> {
    try {
      const data = await readFile(path, 'utf8');
      return data;
    } catch (err) {
      throw new Error(`Error reading file from path ${path}: ${err.message}`);
    }
  }

  async saveImageToDisk(file: Express.Multer.File) {
    const uploadPath = join(__dirname, '..', '..', '..', 'uploads'); // Make sure the directory exists
    const filename = `${Date.now()}-${file.originalname}`;
    const fullPath = join(uploadPath, filename);

    try {
      await writeFile(fullPath, file.buffer);
      console.log('File saved to:', fullPath);
      return filename;
    } catch (error) {
      console.error('Failed to save file:', error);
      throw new Error('Failed to save file');
    }
  }
}
