import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DATABASE_PROVIDERS } from './constant';

export const databaseProvider = [
    {
        provide: DATABASE_PROVIDERS.DATA_SOURCE,
        useFactory: async (config: ConfigService) => {
            const datasource = new DataSource({
                type: 'postgres',
                host: config.get('POSTGRES_HOST'),
                port: parseInt(config.get('POSTGRES_PORT') ?? '5432', 10),
                username: config.get('POSTGRES_USER'),
                password: config.get('POSTGRES_PASSWORD'),
                database: config.get('POSTGRES_DB'),
                entities: [__dirname + '/entities/*.entity{.ts,.js}'],
                synchronize: config.get('NODE_ENV') !== 'prod',
            });

            return datasource.initialize();
        },
        inject: [ConfigService],
    },
];
