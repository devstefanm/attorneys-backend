import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('display_name');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name').nullable();
    table.string('last_name').nullable();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table
      .integer('role')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('roles');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('business_numbers', (table) => {
    table.increments('id').primary();
    table.string('number').notNullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('cities', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('clients', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('courts', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('employers', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('excerpts', (table) => {
    table.increments('id').primary();
    table.integer('excerpt_number').notNullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('files', (table) => {
    table.increments('id').primary();
    table.string('filename').notNullable();
    table.string('path').notNullable();
    table.string('mime_type').notNullable();
    table.integer('size').unsigned().notNullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('packages', (table) => {
    table.increments('id').primary();
    table.string('package_name').notNullable().unique();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('ssn_numbers', (table) => {
    table.increments('id').primary();
    table.bigInteger('ssn').notNullable().unique();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('lawyers', (table) => {
    table.increments('id').primary();
    table.string('office_name').nullable();
    table.string('first_name').nullable();
    table.string('last_name').nullable();
    table.string('email').nullable();
    table.string('address').nullable();
    table.integer('city_id').unsigned().nullable();
    table.foreign('city_id').references('cities.id').onDelete('SET NULL');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('executors', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('address').nullable();
    table.integer('city_id').unsigned().nullable();
    table.foreign('city_id').references('cities.id').onDelete('SET NULL');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('people', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.bigInteger('jmbg').notNullable();
    table.boolean('employed').defaultTo(false).notNullable();
    table.integer('employer_id').unsigned().nullable();
    table
      .foreign('employer_id')
      .references('employers.id')
      .onDelete('SET NULL');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('organizations', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.bigInteger('pib').nullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('debtors', (table) => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.boolean('is_legal').notNullable();
    table.boolean('cession').notNullable();
    table.string('address').nullable();
    table.string('email').nullable();
    table.string('zip_code', 5).nullable();
    table.integer('entity_id').unsigned().notNullable();
    table.integer('person_id').unsigned().nullable();
    table.foreign('person_id').references('people.id').onDelete('SET NULL');
    table.integer('organization_id').unsigned().nullable();
    table
      .foreign('organization_id')
      .references('organizations.id')
      .onDelete('SET NULL');
    table.integer('city_id').unsigned().nullable();
    table.foreign('city_id').references('cities.id').onDelete('SET NULL');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('phone_numbers', (table) => {
    table.increments('id').primary();
    table.string('number').notNullable();
    table.string('display_number').nullable();
    table.integer('debtor_id').unsigned().nullable();
    table.foreign('debtor_id').references('debtors.id').onDelete('CASCADE');
    table.integer('lawyer_id').unsigned().nullable();
    table.foreign('lawyer_id').references('lawyers.id').onDelete('CASCADE');
    table.integer('executor_id').unsigned().nullable();
    table.foreign('executor_id').references('executors.id').onDelete('CASCADE');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('cases', (table) => {
    table.increments('id').primary();
    table.bigInteger('case_number').notNullable();
    table.bigInteger('contract_number').notNullable();
    table
      .enu('status', ['active', 'closed'], {
        useNative: true,
        enumName: 'case_status',
      })
      .notNullable()
      .defaultTo('active');
    table.dateTime('closing_date').nullable();
    table.string('business_number').nullable();
    table.integer('debtor_id').unsigned().notNullable();
    table.foreign('debtor_id').references('debtors.id').onDelete('CASCADE');
    table.integer('lawyer_id').unsigned().nullable();
    table.foreign('lawyer_id').references('lawyers.id').onDelete('SET NULL');
    table.integer('client_id').unsigned().notNullable();
    table.foreign('client_id').references('clients.id').onDelete('CASCADE');
    table.integer('court_id').unsigned().nullable();
    table.foreign('court_id').references('courts.id').onDelete('SET NULL');
    table.integer('ssn_number_id').unsigned().nullable();
    table
      .foreign('ssn_number_id')
      .references('ssn_numbers.id')
      .onDelete('SET NULL');
    table.integer('package_id').unsigned().nullable();
    table.foreign('package_id').references('packages.id').onDelete('SET NULL');
    table.decimal('principal', 16, 2).notNullable();
    table.decimal('interest', 16, 2).notNullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table
      .enum('type', ['payment', 'fee', 'legal_fee'], {
        useNative: true,
        enumName: 'transaction_type',
      })
      .notNullable();
    table.decimal('amount', 16, 2).notNullable();
    table.string('posting_method', 5).notNullable();
    table.timestamp('payment_date').defaultTo(knex.fn.now()).notNullable();
    table.integer('case_id').unsigned().notNullable();
    table.foreign('case_id').references('cases.id').onDelete('CASCADE');
    table.integer('excerpt_id').unsigned().nullable();
    table.foreign('excerpt_id').references('excerpts.id').onDelete('SET NULL');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('case_executors', (table) => {
    table.integer('case_id').unsigned().notNullable();
    table.foreign('case_id').references('cases.id').onDelete('CASCADE');
    table.integer('executor_id').unsigned().notNullable();
    table.foreign('executor_id').references('executors.id').onDelete('CASCADE');
    table.primary(['case_id', 'executor_id']);
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('case_business_numbers', (table) => {
    table.integer('case_id').unsigned().notNullable();
    table.foreign('case_id').references('cases.id').onDelete('CASCADE');
    table.integer('business_number_id').unsigned().notNullable();
    table
      .foreign('business_number_id')
      .references('business_numbers.id')
      .onDelete('CASCADE');
    table.primary(['case_id', 'business_number_id']);
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('roles');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('business_numbers');
  await knex.schema.dropTableIfExists('cities');
  await knex.schema.dropTableIfExists('clients');
  await knex.schema.dropTableIfExists('courts');
  await knex.schema.dropTableIfExists('employers');
  await knex.schema.dropTableIfExists('excerpts');
  await knex.schema.dropTableIfExists('files');
  await knex.schema.dropTableIfExists('packages');
  await knex.schema.dropTableIfExists('ssn_numbers');
  await knex.schema.dropTableIfExists('lawyers');
  await knex.schema.dropTableIfExists('executors');
  await knex.schema.dropTableIfExists('people');
  await knex.schema.dropTableIfExists('organizations');
  await knex.schema.dropTableIfExists('debtors');
  await knex.schema.dropTableIfExists('phone_numbers');
  await knex.schema.dropTableIfExists('cases');
  await knex.schema.dropTableIfExists('transactions');
  await knex.schema.dropTableIfExists('case_executors');
  await knex.schema.dropTableIfExists('case_business_numbers');
}
