import { Knex } from 'knex';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildEmployersNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  builder.orWhere(function () {
    this.whereRaw('LOWER(emp.name) LIKE ?', [`%${term.toLowerCase()}%`]);
  });
};
