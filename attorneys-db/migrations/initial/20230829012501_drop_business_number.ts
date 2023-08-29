import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cases', (table) => {
    table.dropColumn('business_number');
  });
}

export async function down(knex: Knex): Promise<void> {}
