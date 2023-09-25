import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cases', (table) => {
    table.string('case_number', 255).alter();
    table.string('contract_number', 255).alter();
    table.unique(['case_number', 'contract_number']);
    table.boolean('limitation_objection');
    table.string('comment', 600);
    table.dateTime('entering_date');
    table.decimal('old_payment');
    table.dateTime('lawyer_hand_over_date');
    table.decimal('our_taxes');
    table.decimal('warning_price');
    table.decimal('lawyer_fee');
  });

  await knex.schema.alterTable('executors', (table) => {
    table.string('email').nullable().alter();
  });

  await knex.schema.alterTable('debtors', (table) => {
    table.dropColumn('entity_id');
  });

  await knex.schema.dropTableIfExists('files');

  await knex.schema.alterTable('people', (table) => {
    table.unique(['jmbg']);
  });

  await knex.schema.alterTable('organizations', (table) => {
    table.unique(['pib']);
  });
}

export async function down(knex: Knex): Promise<void> {}
