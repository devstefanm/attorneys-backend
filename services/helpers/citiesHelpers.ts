import { Knex } from 'knex';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildCitiesNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  builder.orWhere(function () {
    this.whereRaw('LOWER(ci.name) LIKE ?', [`%${term.toLowerCase()}%`]);
  });
};
