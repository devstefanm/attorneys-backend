import { Knex } from 'knex';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildCasesNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  if (term.includes(' ')) {
    const [firstName, lastName] = term.split(' ');

    builder
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(p.first_name) = ?', [
            firstName.toLowerCase(),
          ]).andWhereRaw('LOWER(p.last_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]);
        }).orWhere(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${firstName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [lastName.toLowerCase()]);
        }).orWhere(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhereRaw('LOWER(o.name) LIKE ?', [`%${term.toLowerCase()}%`]);
  } else {
    builder.orWhere(function () {
      this.whereRaw('LOWER(p.first_name) LIKE ?', [`%${term.toLowerCase()}%`])
        .orWhereRaw('LOWER(p.last_name) LIKE ?', [`%${term.toLowerCase()}%`])
        .orWhereRaw('LOWER(o.name) LIKE ?', [`%${term.toLowerCase()}%`]);
    });
  }
};

export const buildLawyerNameSearchConditions = (
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
      })
      .orWhereRaw('LOWER(l.office_name) LIKE ?', [`%${term.toLowerCase()}%`]);
  } else {
    builder.orWhere(function () {
      this.whereRaw('LOWER(l.first_name) LIKE ?', [`%${term.toLowerCase()}%`])
        .orWhereRaw('LOWER(l.last_name) LIKE ?', [`%${term.toLowerCase()}%`])
        .orWhereRaw('LOWER(l.office_name) LIKE ?', [`%${term.toLowerCase()}%`]);
    });
  }
};

export const generateJmbgAndPibSearchQuery = (
  query: QueryBuilder,
  searchNumber: string,
) => {
  query.where(function () {
    this.orWhereRaw('p.jmbg::text LIKE ?', [`%${searchNumber}%`]).orWhereRaw(
      'o.pib::text LIKE ?',
      [`%${searchNumber}%`],
    );
  });

  return query;
};
