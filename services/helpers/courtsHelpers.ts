import { Knex } from 'knex';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildCourtsNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  builder.orWhere(function () {
    this.whereRaw('LOWER(co.name) LIKE ?', [`%${term.toLowerCase()}%`]);
  });
};
