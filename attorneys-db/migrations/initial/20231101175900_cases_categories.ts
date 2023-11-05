import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('cases', (table) => {
    table.decimal('opposing_party_expense');
    table.enum(
      'case_category',
      ['withdrawn', 'combined', 'obsolete', 'with_payment'],
      {
        useNative: true,
        enumName: 'case_categories',
      },
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('cases', (table) => {
    table.dropColumn('opposing_party_expense');
    table.dropColumn('case_category');
  });
}
