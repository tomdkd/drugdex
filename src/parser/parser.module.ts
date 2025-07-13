import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';
import { ParserService } from './parser.service';
import * as fs from 'fs';
import * as readline from 'readline';

@Module({
  imports: [FileModule],
  providers: [ParserService],
})
export class ParserModule implements OnModuleInit {
  private readonly logger = new Logger(ParserModule.name);

  constructor(
    private readonly fileService: FileService,
    private readonly parserService: ParserService,
  ) {}

  async onModuleInit() {
    const fileStream = fs.createReadStream(this.fileService.getLastFilePath(), {
      encoding: 'utf8',
    });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let linesCount = 0;
    const timeStart = Date.now();

    for await (const line of rl) {
      const lineSplitted = this.parserService.splitLine(line);
      this.parserService.toMedLine(lineSplitted);
      linesCount++;
    }

    const timeEnd = Date.now();
    const timeTaken = (timeEnd - timeStart) / 1000;

    this.logger.log(`Parsed ${linesCount} lines in ${timeTaken} seconds.`);
  }
}
