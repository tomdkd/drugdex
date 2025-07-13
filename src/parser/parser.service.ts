import { Injectable, Logger } from '@nestjs/common';
import { MedLine } from './interfaces/med-line.interface';
import { parse } from 'date-fns';

@Injectable()
export class ParserService {

  private readonly logger: Logger = new Logger(ParserService.name);

  splitLine(line: string): string[] {
    return line.split('\t').map((item) => item.trim());
  }

  toMedLine(line: string[]): MedLine {
    return{
      cis_code: line[0] ? parseInt(line[0], 10) : null,
      name: line[1] ?? null,
      type: line[2] ?? null,
      to_use: line[3] ? line[3].split(';').map((item) => item.trim()) : null,
      status: line[4] ?? null,
      process_type: line[5] ?? null,
      shoppable: line[6] === '1',
      date_of_shop: line[7] ? parse(line[7], 'dd/MM/yyyy', new Date()) : null,
      availabity_status: line[8] ?? null,
      auth_number: line[9] ?? null,
      owners: line[10] ? line[10].split(';').map((item) => item.trim()) : null,
      enforce_warning: line[11] === '1',
    };
  }
}
