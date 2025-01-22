import { SequelizeStorage, Umzug } from "umzug"
import sequelize from "../models/db.js";
import logger from "./logger.js";
import { Sequelize } from "sequelize";

export const runMigration = async () => {
    const umzug = new Umzug({
        migrations: { glob: 'src/migrations/*.cjs' },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
    });

    const pending = await umzug.pending();
    if (pending.length > 0) {
        logger.info(`Pending Migration: ${pending.map(m => m.name).join(',')}`);
    }

    await umzug.up();
    logger.info('All migrations performed successfully!');
}