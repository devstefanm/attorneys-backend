import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('lawyers', (table) => {
    table.string('office_name').nullable().alter();
  });

  await knex.schema.alterTable('cases', (table) => {
    table.dropColumn('status');
    table
      .enu('state', ['active', 'closed'], {
        useNative: true,
        enumName: 'case_state',
      })
      .notNullable()
      .defaultTo('active');
  });

  await knex.schema.createTable('statuses', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('created_by');
    table.string('updated_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('cases', (table) => {
    table.integer('status_id').unsigned();
    table.foreign('status_id').references('id').inTable('statuses');
  });
}

export async function down(knex: Knex): Promise<void> {}
