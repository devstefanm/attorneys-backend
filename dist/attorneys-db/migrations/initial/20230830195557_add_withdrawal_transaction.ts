import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TYPE transaction_type ADD VALUE 'withdrawal';
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TYPE transaction_type DROP VALUE 'withdrawal';
  `);
}
