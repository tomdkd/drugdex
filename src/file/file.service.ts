import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  private readonly fileDir: string = path.resolve(__dirname, '../../files');
  private readonly medsURL =
    'https://base-donnees-publique.medicaments.gouv.fr/download/file/CIS_bdpm.txt';
  private readonly newMedsFilename = `meds-${new Date().getTime()}.txt`;
  private readonly destFile = path.join(this.fileDir, this.newMedsFilename);
  private readonly logger: Logger = new Logger(FileService.name);

  getFileDir() {
    return this.fileDir;
  }

  getNewMedsFilename() {
    return this.newMedsFilename;
  }

  getLastFilePath() {
    const files = fs.readdirSync(this.fileDir);
    return `${this.fileDir}/${files[files.length - 1]}`;
  }

  async downloadFile() {
    const response = await axios({
      url: this.medsURL,
      method: 'GET',
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(this.destFile);
    return new Promise((resolve, reject) => {
      (response.data as Readable).pipe(writer);
      writer.on('finish', () => resolve(this.destFile));
      writer.on('error', reject);
    });
  }

  deleteFiles() {
    if (fs.existsSync(this.fileDir)) {
      const files = fs.readdirSync(this.fileDir);
      files.forEach((file) => {
        const filePath = path.join(this.fileDir, file);
        try {
          fs.unlinkSync(filePath);
          this.logger.log(`Deleted file: ${file}`);
        } catch (err) {
          if (err instanceof Error) {
            this.logger.error(`Error deleting file ${file}: ${err.message}`);
          } else {
            this.logger.error(
              `Error deleting file ${file}: ${JSON.stringify(err)}`,
            );
          }
        }
      });
    } else {
      this.logger.warn(`Directory does not exist: ${this.fileDir}`);
    }
  }
}
