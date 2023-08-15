import { Knex } from 'knex';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildClientsNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  builder.orWhere(function () {
    this.whereRaw('LOWER(cl.name) LIKE ?', [`%${term.toLowerCase()}%`]);
  });
};
