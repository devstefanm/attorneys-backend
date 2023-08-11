import { Knex } from 'knex';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildLawyersNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  if (term.includes(' ')) {
    const [firstName, lastName] = term.split(' ');

    builder
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(l.first_name) = ?', [
            firstName.toLowerCase(),
          ]).andWhereRaw('LOWER(l.last_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]);
        }).orWhere(function () {
          this.whereRaw('LOWER(l.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(l.first_name) LIKE ?', [
            `%${firstName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(l.last_name) = ?', [lastName.toLowerCase()]);
        }).orWhere(function () {
          this.whereRaw('LOWER(l.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName.toLowerCase()]);
        });
      });
  } else {
    builder.orWhere(function () {
      this.whereRaw('LOWER(l.first_name) LIKE ?', [
        `%${term.toLowerCase()}%`,
      ]).orWhereRaw('LOWER(l.last_name) LIKE ?', [`%${term.toLowerCase()}%`]);
    });
  }
};

export const buildLawyersOfficeNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  builder.orWhere(function () {
    this.whereRaw('LOWER(l.office_name) LIKE ?', [`%${term.toLowerCase()}%`]);
  });
};
