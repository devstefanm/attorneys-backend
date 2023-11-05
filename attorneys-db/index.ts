import knex, { Knex } from 'knex';
import config from './knexfile';

const environment = process.env.ENV as string;
const connectionConfig = config[environment];

export const db: Knex = knex(connectionConfig);
export const runMigrations = async (): Promise<void> => {
  try {
    console.log('Running migrations...');
    await db.migrate.latest();
    console.log('Migrations run successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    db.destroy();
  }
};
