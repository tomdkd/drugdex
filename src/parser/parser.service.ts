import { Injectable } from '@nestjs/common';
import { MedLine } from './interfaces/med-line.interface';

@Injectable()
export class ParserService {
  splitLine(line: string): string[] {
    return line.split('\t').map((item) => item.trim());
  }

  toMedLine(line: string[]): MedLine {
    return {
      cis_code: parseInt(line[0], 10),
      med_name: line[1],
      type: line[2],
      to_use: line[3].split(';').map((item) => item.trim()),
      status: line[4],
      process_type: line[5],
      shoppable: line[6] === '1',
      date_of_shop: line[7],
      availabity_status: line[8] || null,
      auth_number: line[9] || null,
      owners: line[10].split(';').map((item) => item.trim()),
      enforce_warning: line[11] === '1',
    };
  }
}
