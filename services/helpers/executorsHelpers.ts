import { Knex } from 'knex';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildExecutorsNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  if (term.includes(' ')) {
    const [firstName, lastName] = term.split(' ');

    builder
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(e.first_name) = ?', [
            firstName.toLowerCase(),
          ]).andWhereRaw('LOWER(e.last_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]);
        }).orWhere(function () {
          this.whereRaw('LOWER(e.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(e.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(e.first_name) LIKE ?', [
            `%${firstName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(e.last_name) = ?', [lastName.toLowerCase()]);
        }).orWhere(function () {
          this.whereRaw('LOWER(e.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(e.last_name) = ?', [firstName.toLowerCase()]);
        });
      });
  } else {
    builder.orWhere(function () {
      this.whereRaw('LOWER(e.first_name) LIKE ?', [
        `%${term.toLowerCase()}%`,
      ]).orWhereRaw('LOWER(e.last_name) LIKE ?', [`%${term.toLowerCase()}%`]);
    });
  }
};
