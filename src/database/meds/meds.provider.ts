import { DataSource } from "typeorm";
import { DATABASE_PROVIDERS } from "../constant";

export const medsProvider = [
    {
        provide: DATABASE_PROVIDERS.MEDS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository('Med'),
        inject: [DATABASE_PROVIDERS.DATA_SOURCE],
    }
]