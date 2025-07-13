import { Inject, Injectable, Logger } from "@nestjs/common";
import { DATABASE_PROVIDERS } from "../constant";
import { DeepPartial, InsertResult, Repository } from "typeorm";
import { Med } from "../entities/med.entity";

@Injectable()
export class MedsService {

    private readonly logger: Logger = new Logger(MedsService.name);

    constructor(
        @Inject(DATABASE_PROVIDERS.MEDS_REPOSITORY)
        private medsRepository: Repository<Med>,
    ) { }

    async findAll(): Promise<Med[]> {
        return this.medsRepository.find();
    }

    async insertOne(med: DeepPartial<Med>): Promise<Med> {
        return this.medsRepository.save(med);
    }

    async insertMany(meds: DeepPartial<Med>[]): Promise<InsertResult> {
        return this.medsRepository
            .createQueryBuilder()
            .insert()
            .into(Med)
            .values(meds)
            .execute()
    }

}