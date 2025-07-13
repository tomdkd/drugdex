import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileService } from './file.service';
import * as fs from 'fs';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export class FileModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(FileModule.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}

  async onModuleInit() {
    const fileDir = this.fileService.getFileDir();
    const newMedsFilename = this.fileService.getNewMedsFilename();

    if (this.configService.get('RELOAD_FILES') === 'true') {
      this.logger.log('RELOAD_FILES is set to true, deleting old files.');
      this.fileService.deleteFiles();
    }

    if (!fs.existsSync(fileDir)) {
      this.logger.log(`Creating directory: ${fileDir}`);
      fs.mkdirSync(fileDir, { recursive: true });
      this.logger.log(`Directory created: ${fileDir}`);
    }

    await this.fileService
      .downloadFile()
      .then(() => this.logger.log(`File ${newMedsFilename} downloaded`))
      .catch((error) => this.logger.error(error));
  }
}
