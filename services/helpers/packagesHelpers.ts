import { Knex } from 'knex';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildPackagesNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  builder.orWhere(function () {
    this.whereRaw('LOWER(pck.package_name) LIKE ?', [
      `%${term.toLowerCase()}%`,
    ]);
  });
};
