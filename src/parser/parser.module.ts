import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';
import { ParserService } from './parser.service';
import * as fs from 'fs';
import * as readline from 'readline';
import { DatabaseModule } from 'src/database/database.module';
import { MedsService } from 'src/database/services/meds.service';
import { Med } from 'src/database/entities/med.entity';
import { DeepPartial } from 'typeorm';

@Module({
  imports: [FileModule, DatabaseModule],
  providers: [ParserService, MedsService],
})
export class ParserModule implements OnModuleInit {
  private readonly logger = new Logger(ParserModule.name);

  constructor(
    private readonly fileService: FileService,
    private readonly parserService: ParserService,
    private readonly medsService: MedsService,
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
      const med = this.parserService.toMedLine(lineSplitted);
      this.medsService.insertOne(med as DeepPartial<Med>);
      linesCount++;
    }

    const timeEnd = Date.now();
    const timeTaken = (timeEnd - timeStart) / 1000;

    this.logger.log(`Parsed and saved ${linesCount} lines in ${timeTaken} seconds.`);
  }
}
