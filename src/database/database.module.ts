import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { MedsService } from './services/meds.service';
import { medsProvider } from './meds/meds.provider';

@Module({
  imports: [],
  providers: [
    ...databaseProvider,
    ...medsProvider,
    MedsService
  ],
  exports: [
    ...databaseProvider,
    ...medsProvider,
    MedsService
  ],
})
export class DatabaseModule {}
