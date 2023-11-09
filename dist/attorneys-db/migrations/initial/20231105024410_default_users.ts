import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex('roles').insert([
    {
      id: 1,
      name: 'administrator',
      display_name: 'Administrator',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      name: 'visitor',
      display_name: 'Visitor',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);

  await knex('users').insert([
    {
      first_name: 'Admin',
      last_name: 'Administrator',
      username: 'admin.creditexpress',
      email: 'admin.creditexpress@mailinator.com',
      password: '$2a$10$rcQK64OXTDEAwSzxHI1DXOMVCPzmcYZ6wt4WhqPJJpBAOmBl5JEvS', // Hashed password
      role: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      first_name: 'Visitor',
      last_name: 'Visitor',
      username: 'visitor.creditexpress',
      email: 'visitor.creditexpress@mailinator.com',
      password: '$2a$10$rcQK64OXTDEAwSzxHI1DXOMVCPzmcYZ6wt4WhqPJJpBAOmBl5JEvS', // Hashed password
      role: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      first_name: 'Miloš',
      last_name: 'Simonović',
      username: 'milos.simonovic',
      email: 'milos.simonovic@creditexpress.rs',
      password: '$2a$10$rcQK64OXTDEAwSzxHI1DXOMVCPzmcYZ6wt4WhqPJJpBAOmBl5JEvS', // Hashed password
      role: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      first_name: 'Ivan',
      last_name: 'Lukić',
      username: 'ivan.lukic',
      email: 'ivan.lukic@creditexpress.rs',
      password: '$2a$10$rcQK64OXTDEAwSzxHI1DXOMVCPzmcYZ6wt4WhqPJJpBAOmBl5JEvS', // Hashed password
      role: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      first_name: 'Ivana',
      last_name: 'Pekić',
      username: 'ivana.pekic',
      email: 'ivana.pekic@creditexpress.rs',
      password: '$2a$10$rcQK64OXTDEAwSzxHI1DXOMVCPzmcYZ6wt4WhqPJJpBAOmBl5JEvS', // Hashed password
      role: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex('roles').where({ name: 'administrator' }).del();
  await knex('roles').where({ name: 'visitor' }).del();
  await knex('users').where({ username: 'admin.creditexpress' }).del();
  await knex('users').where({ username: 'visitor.creditexpress' }).del();
  await knex('users').where({ username: 'milos.simonovic' }).del();
  await knex('users').where({ username: 'ivan.lukic' }).del();
  await knex('users').where({ username: 'ivana.pekic' }).del();
}
