import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IClient } from 'types/clientsTypes';
import { IEmployer } from 'types/employersTypes';
import { IExecutor } from 'types/executorsTypes';
import { ILawyer } from 'types/lawyersTypes';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { Knex } from 'knex';
import specialCharacters from 'utils/specialCharacters';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import { ICaseForImport, ICaseForList } from 'types/casesTypes';
import { uppercaseFirstLetter } from 'utils/transformData';
import catchErrorStack from 'utils/catchErrorStack';

type QueryBuilder = Knex.QueryBuilder<any, any>;

type EntityName =
  | 'clients'
  | 'courts'
  | 'employers'
  | 'executors'
  | 'lawyers'
  | 'cities'
  | 'packages';
type UpperCaseEntityName =
  | 'CLIENTS'
  | 'COURTS'
  | 'EMPLOYERS'
  | 'EXECUTORS'
  | 'LAWYERS'
  | 'CITIES'
  | 'PACKAGES';
type ShortNameApiResponseData = IClient | IEmployer;
type FullNameApiResponseData = IExecutor | ILawyer;

export const getShortNamesServiceTemplate =
  (entity: EntityName) =>
  async (
    req: Request,
    res: Response,
  ): Promise<IApiResponse<ShortNameApiResponseData[] | undefined>> => {
    const { search } = req.query; // The search term is passed as a query parameter
    const searchTerm = search as string;
    // Query the table based on the search term
    let query = db(entity).select('name', 'id');

    const upperCaseEntity = entity.toUpperCase() as UpperCaseEntityName;

    if (search) {
      const searchTerms = specialCharactersChecker(searchTerm);
      generateShortNameSearchQuery(query, searchTerms);
    }

    const names: IClient[] = await query;

    if (names.length <= 0) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseEntity}.NOT_FOUND`);
    }

    res.status(200);
    return mapApiToResponse(
      200,
      `${upperCaseEntity}.SUCCESSFULY_RETRIEVED_NAMES`,
      names,
    );
  };

export const getFullNamesServiceTemplate =
  (entity: EntityName) =>
  async (
    req: Request,
    res: Response,
  ): Promise<IApiResponse<FullNameApiResponseData[] | undefined>> => {
    const { search } = req.query; // The search term is passed as a query parameter
    const searchTerm = search as string;
    // Query the table based on the search term
    let query = db(entity).select('first_name', 'last_name', 'id');

    const upperCaseEntity = entity.toUpperCase() as UpperCaseEntityName;

    if (search) {
      const searchTerms = specialCharactersChecker(searchTerm);
      generateFullNameSearchQuery(query, searchTerms);
    }

    const lawyersNames: FullNameApiResponseData[] = await query;

    if (lawyersNames.length <= 0) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseEntity}.NOT_FOUND`);
    }

    res.status(200);
    return mapApiToResponse(
      200,
      `${upperCaseEntity}.SUCCESSFULY_RETRIEVED_NAMES`,
      lawyersNames,
    );
  };

export const generateFullNameSearchQuery = (
  query: Knex.QueryBuilder,
  searchTerms: string[],
) => {
  query.where(function () {
    for (const term of searchTerms) {
      if (term.includes(' ')) {
        const [firstName, lastName] = term.split(' ');

        this.orWhere(function () {
          this.where(function () {
            this.whereRaw('LOWER(first_name) = ?', [
              firstName.toLowerCase(),
            ]).andWhereRaw('LOWER(last_name) LIKE ?', [
              `%${lastName.toLowerCase()}%`,
            ]);
          }).orWhere(function () {
            this.whereRaw('LOWER(first_name) LIKE ?', [
              `%${lastName.toLowerCase()}%`,
            ]).andWhereRaw('LOWER(last_name) = ?', [firstName.toLowerCase()]);
          });
        }).orWhere(function () {
          this.where(function () {
            this.whereRaw('LOWER(first_name) LIKE ?', [
              `%${firstName.toLowerCase()}%`,
            ]).andWhereRaw('LOWER(last_name) = ?', [lastName.toLowerCase()]);
          }).orWhere(function () {
            this.whereRaw('LOWER(first_name) LIKE ?', [
              `%${lastName.toLowerCase()}%`,
            ]).andWhereRaw('LOWER(last_name) = ?', [firstName.toLowerCase()]);
          });
        });
      } else {
        this.orWhere(function () {
          this.whereRaw('LOWER(first_name) LIKE ?', [
            `%${term.toLowerCase()}%`,
          ]).orWhereRaw('LOWER(last_name) LIKE ?', [`%${term.toLowerCase()}%`]);
        });
      }
    }
  });

  return query;
};

export const generateShortNameSearchQuery = (
  query: Knex.QueryBuilder,
  searchTerms: string[],
  name: string = 'name',
) => {
  query.where(function () {
    for (const term of searchTerms) {
      this.orWhere(function () {
        this.whereRaw(`LOWER(${name}) LIKE ?`, [`%${term.toLowerCase()}%`]);
      });
    }
  });

  return query;
};

export const specialCharactersChecker = (searchTerm: string) => {
  // Create an array to store the search terms
  const searchTerms: string[] = [searchTerm];

  // Iterate through the characters in the search term
  for (let i = 0; i < searchTerm.length; i++) {
    const char = searchTerm[i];
    const replacements = specialCharacters[char.toLowerCase()];
    if (replacements) {
      const modifiedTerms: string[] = [];
      for (const term of searchTerms) {
        for (const replacement of replacements) {
          const modifiedTerm =
            term.slice(0, i) + replacement + term.slice(i + 1);
          if (!searchTerms.includes(modifiedTerm)) {
            modifiedTerms.push(modifiedTerm);
          }
        }
      }
      searchTerms.push(...modifiedTerms);
    }
  }

  return searchTerms;
};

export const generateBigIntSearchQuery = (
  query: QueryBuilder,
  searchBigInt: string,
  column: string,
) => {
  query.where(function () {
    this.orWhereRaw(`${column}::text LIKE ?`, [`%${searchBigInt}%`]);
  });

  return query;
};

export const generateDecimalSearchQuery = (
  query: QueryBuilder,
  searchValue: number,
  column: string,
) => {
  query.where(function () {
    this.where(column, '=', searchValue);
  });

  return query;
};

export const postShortNameServiceTemplate =
  (entity: string) =>
  async (
    req: Request,
    res: Response,
  ): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
    const { name } = req.body;

    let newEntityId = null;

    const uppercasedEntity = uppercaseFirstLetter(entity);

    if (name) {
      newEntityId = (
        await db(entity)
          .insert({
            name,
          })
          .returning('id')
      )[0].id;
    } else {
      res.status(400);
      return mapApiToResponse(400, `errors.noName`);
    }

    let apiResponse: ICreateEntityApiResponseData | undefined = undefined;

    if (newEntityId) {
      apiResponse = {
        id: newEntityId,
      };

      res.status(200);
      return mapApiToResponse(
        200,
        `messages.create${uppercasedEntity}Success`,
        apiResponse,
      );
    }

    res.status(404);
    return mapApiToResponse(404, `errors.notFound`, apiResponse);
  };

export const findRecordByNameOrCreateNew = async (
  name: string,
  entity: string,
  nameField: string,
): Promise<number> => {
  const existingId: number = (
    await db(entity).select('id').where(nameField, name).first()
  )?.id;

  if (!existingId) {
    return (
      await db(entity)
        .insert({
          [nameField]: name,
        })
        .returning('id')
    )[0]?.id;
  }

  return existingId;
};

export const jmbgAndPibGenerator = (
  singleCase: ICaseForImport,
): ICaseForImport => {
  let transformedCase: ICaseForImport = {};
  if (singleCase.is_legal) {
    transformedCase = { ...singleCase, pib: singleCase.jmbg_pib };
  } else {
    transformedCase = { ...singleCase, jmbg: singleCase.jmbg_pib };
  }
  delete transformedCase.jmbg_pib;
  return transformedCase;
};

export const debtorNameGenerator = (
  singleCase: ICaseForImport,
): ICaseForImport => {
  let transformedCase: ICaseForImport = {};

  const { name } = singleCase;

  if (!singleCase.is_legal) {
    const words = (name as string).split(' ');
    const firstName = words.shift();
    const lastName = words.join(' ');

    transformedCase = {
      ...singleCase,
      first_name: firstName,
      last_name: lastName,
    };
    delete transformedCase.name;
    return transformedCase;
  }

  return singleCase;
};

export const editShortNameServiceTemplate =
  (entity: string, id: number) =>
  async (
    req: Request,
    res: Response,
  ): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
    const { name } = req.body;

    if (name === null || name === '') {
      res.status(400);
      return mapApiToResponse(400, `errors.noName`);
    }

    if (name === undefined) {
      res.status(400);
      return mapApiToResponse(400, `errors.nothingChanged`);
    }

    const existingRecord = await db(entity)
      .select('name')
      .where('id', id)
      .first();

    if (!existingRecord) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    if (name && existingRecord.name !== name) {
      const apiResponse: ICreateEntityApiResponseData = (
        await db('cities').where('id', id).update({ name }).returning('id')
      )[0];
      res.status(200);
      return mapApiToResponse(200, `messages.editCitiesSuccess`, apiResponse);
    }

    return catchErrorStack(res, `errors.serverError`);
  };
