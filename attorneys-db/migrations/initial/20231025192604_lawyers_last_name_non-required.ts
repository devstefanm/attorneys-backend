import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('lawyers', (table) => {
    table.string('last_name').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {}
