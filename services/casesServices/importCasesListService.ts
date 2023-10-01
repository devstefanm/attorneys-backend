import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import ExcelJS from 'exceljs';
import {
  reverseHeaderMapping,
  transformParsedDataToCase,
} from 'services/helpers/casesHelpers';
import { ICaseForList, ICaseForImport } from 'types/casesTypes';
import { db } from 'attorneys-db';
import { findRecordByNameOrCreateNew } from 'services/helpers/universalHelpers';
import { capitalizeEveryWord } from 'utils/transformData';
import { IPeople } from 'types/peopleTypes';
import { IOrganization } from 'types/organizationsTypes';
import { mapPhoneNumberForDisplay } from 'services/helpers/phoneNumbersHelpers';

export const importCasesListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | string | undefined>> => {
  try {
    if (!req.file) {
      res.status(400);
      return mapApiToResponse(400, `errors.noFile`);
    }

    const uploadedFile = req.file;

    const fileExtension = uploadedFile.originalname.split('.').pop();

    const cases: ICaseForList[] = [];
    if (fileExtension === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(uploadedFile.buffer);

      const worksheet = workbook.worksheets[0];

      // Get the header row to use as keys for objects
      const headerRow = worksheet.getRow(1).values as string[];

      const reversedHeaders = reverseHeaderMapping(headerRow);

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          // Skip the header row if present
          const rowData = row.values as ExcelJS.CellValue[];
          const rowDataObject: ICaseForImport = {};

          // Create an object with keys from headers and values from the row
          reversedHeaders.forEach((header, index) => {
            rowDataObject[header] = rowData[index];
          });

          const transformedRowDataObject =
            transformParsedDataToCase(rowDataObject);

          cases.push(transformedRowDataObject);
        }
      });
    } else if (fileExtension === 'csv') {
      const csvBuffer = req.file.buffer;

      let headers: string[] = [];
      csvBuffer
        .toString()
        .split('\n')
        .forEach((line, index) => {
          if (!line.trim()) {
            return;
          }

          line = line.replace(/\r/g, '');

          if (index === 0) {
            headers.push(...line.split(','));
            headers = reverseHeaderMapping(headers);
          } else {
            const dataRow = line.split(',');
            const rowDataObject: ICaseForImport = {};
            let skipRow = false;

            headers.forEach((header, columnIndex) => {
              if (dataRow[columnIndex] === undefined) {
                skipRow = true;
                return;
              }
              rowDataObject[header] = dataRow[columnIndex];
            });

            const transformedRowDataObject =
              transformParsedDataToCase(rowDataObject);

            if (!skipRow) {
              cases.push(transformedRowDataObject);
            }
          }
        });
    }

    const newCaseIds: number[] = [];

    for (const caseData of cases) {
      let {
        first_name,
        last_name,
        jmbg,
        employed,
        employer,
        executors,
        name,
        pib,
        cession,
        address,
        email,
        zip_code,
        city,
        case_number,
        contract_number,
        closing_date,
        business_numbers,
        phone_numbers,
        lawyer_first_name,
        lawyer_last_name,
        lawyer_office_name,
        client,
        court,
        ssn,
        package: packageName,
        principal,
        interest,
        employer_id,
        city_id,
        client_id,
        court_id,
        executor_ids = [],
        ssn_number_id,
        package_id,
        lawyer_id,
        is_legal,
        status_id,
        status,
        old_payment,
        our_taxes,
        warning_price,
        entering_date,
        lawyer_hand_over_date,
        comment,
        limitation_objection,
      } = caseData;

      if ((!first_name || !last_name) && !name) {
        res.status(400);
        return mapApiToResponse(400, `errors.noName`);
      }

      if (first_name && last_name && !jmbg) {
        res.status(400);
        return mapApiToResponse(400, `errors.noJMBG`);
      }

      if (!case_number) {
        res.status(400);
        return mapApiToResponse(400, `errors.noCaseNumber`);
      }

      if (!contract_number) {
        res.status(400);
        return mapApiToResponse(400, `errors.noContractNumber`);
      }

      if (!client) {
        res.status(400);
        return mapApiToResponse(400, `errors.noClient`);
      }

      if (cession === undefined || cession === null || cession === '') {
        res.status(400);
        return mapApiToResponse(400, `errors.noCession`);
      }

      if (is_legal === undefined || is_legal === null || is_legal === '') {
        res.status(400);
        return mapApiToResponse(400, `errors.noIsLegal`);
      }

      if (case_number && contract_number) {
        const existingCase = await db('cases')
          .select('id', 'case_number', 'contract_number')
          .where('case_number', case_number)
          .orWhere('contract_number', contract_number)
          .first();

        if (existingCase?.id) {
          res.status(400);
          return mapApiToResponse(
            400,
            `errors.caseOrContractNumberDuplicate`,
            `${existingCase.case_number}, ${existingCase.contract_number}`,
          );
        }
      }

      if (status) {
        status_id = await findRecordByNameOrCreateNew(
          status,
          'statuses',
          'name',
        );
      }

      if (city) {
        city_id = await findRecordByNameOrCreateNew(
          capitalizeEveryWord(city),
          'cities',
          'name',
        );
      }

      if (employed && employer) {
        employer_id = await findRecordByNameOrCreateNew(
          employer,
          'employers',
          'name',
        );
      }

      if (client) {
        client_id = await findRecordByNameOrCreateNew(
          client,
          'clients',
          'name',
        );
      } else {
        res.status(400);
        return mapApiToResponse(400, `errors.noClient`);
      }

      if (court) {
        court_id = await findRecordByNameOrCreateNew(court, 'courts', 'name');
      }

      if (ssn) {
        ssn_number_id = await findRecordByNameOrCreateNew(
          ssn,
          'ssn_numbers',
          'ssn',
        );
      }

      if (packageName) {
        package_id = await findRecordByNameOrCreateNew(
          packageName,
          'packages',
          'package_name',
        );
      }

      if (lawyer_first_name) {
        lawyer_id = (
          await db('lawyers')
            .select('id')
            .where({
              first_name: lawyer_first_name,
              last_name: lawyer_last_name,
            })
            .first()
        )?.id;

        if (!lawyer_id) {
          lawyer_id = (
            await db('lawyers')
              .insert({
                first_name: lawyer_first_name,
                last_name: lawyer_last_name,
                ...(lawyer_office_name && { office_name: lawyer_office_name }),
              })
              .returning('id')
          )[0]?.id;
        }
      }

      if (executors && executors.length > 0) {
        for (const executor of executors) {
          const words = executor.split(' ');
          const firstName = words.shift();
          const lastName = words.join(' ');

          let executorId: number;
          executorId = (
            await db('executors')
              .select('id')
              .where({ first_name: firstName, last_name: lastName })
              .first()
          )?.id;

          if (!executorId) {
            executorId = (
              await db('executors')
                .insert({
                  first_name: firstName,
                  last_name: lastName,
                })
                .returning('id')
            )[0]?.id;
          }
          executor_ids.push(executorId);
        }
      }

      let debtorId: number | undefined;

      if (jmbg) {
        const jmbgNumber = jmbg as string;

        const existingPerson: IPeople = await db('people')
          .where('jmbg', jmbgNumber)
          .first();

        if (existingPerson?.id) {
          await db('people').where('id', existingPerson.id).update({
            first_name,
            last_name,
            employed,
            employer_id,
          });

          debtorId = (
            await db('debtors')
              .select('id')
              .where('person_id', existingPerson.id)
              .first()
          )?.id;
        } else {
          const newPersonId: number = (
            await db('people')
              .insert({
                jmbg,
                first_name,
                last_name,
                employed,
                employer_id,
              })
              .returning('id')
          )[0].id;

          debtorId = (
            await db('debtors')
              .insert({
                type: 'person',
                is_legal: false,
                person_id: Number(newPersonId),
                cession,
                address,
                email,
                zip_code,
                city_id,
              })
              .returning('id')
          )[0].id;
        }
      } else if (name || pib) {
        const organizationName = name as string;
        const organizationPib = pib as string;
        let existingOrganization: IOrganization | undefined;

        if (organizationPib) {
          existingOrganization = await db('organizations')
            .where('pib', organizationPib)
            .first();

          if (existingOrganization?.id) {
            if (
              existingOrganization.name?.toLowerCase() !==
              organizationName.toLowerCase()
            ) {
              await db('organizations')
                .where('id', existingOrganization.id)
                .update({ name: organizationName });
            }
            debtorId = (
              await db('debtors')
                .select('id')
                .where('organization_id', existingOrganization.id)
                .first()
            )?.id;
          }
        }

        if (!existingOrganization?.id) {
          const existingOrganizations: IOrganization[] = await db(
            'organizations',
          )
            .select('id', 'name', 'pib')
            .where('name', organizationName);

          if (existingOrganizations.length !== 0) {
            if (existingOrganizations.length === 1) {
              existingOrganization = existingOrganizations[0];

              if (!existingOrganization.pib) {
                if (organizationPib) {
                  await db('organizations')
                    .where('id', existingOrganization.id)
                    .update({ pib: organizationPib });
                }
                debtorId = (
                  await db('debtors')
                    .select('id')
                    .where('organization_id', existingOrganization.id)
                    .first()
                )?.id;
              } else {
                const newOrganizationId = (
                  await db('organizations')
                    .insert({
                      name: organizationName,
                      pib: organizationPib,
                    })
                    .returning('id')
                )[0].id;

                debtorId = (
                  await db('debtors')
                    .insert({
                      type: 'organization',
                      is_legal: true,
                      organization_id: newOrganizationId,
                      cession,
                      address,
                      email,
                      zip_code,
                      city_id,
                    })
                    .returning('id')
                )[0].id;
              }
            } else {
              const newOrganizationId = (
                await db('organizations')
                  .insert({
                    name: organizationName,
                    pib: organizationPib,
                  })
                  .returning('id')
              )[0].id;

              debtorId = (
                await db('debtors')
                  .insert({
                    type: 'organization',
                    is_legal: true,
                    organization_id: newOrganizationId,
                    cession,
                    address,
                    email,
                    zip_code,
                    city_id,
                  })
                  .returning('id')
              )[0].id;
            }
          } else {
            const newOrganizationId = (
              await db('organizations')
                .insert({
                  name: organizationName,
                  pib: organizationPib,
                })
                .returning('id')
            )[0].id;

            debtorId = (
              await db('debtors')
                .insert({
                  type: 'organization',
                  is_legal: true,
                  organization_id: newOrganizationId,
                  cession,
                  address,
                  email,
                  zip_code,
                  city_id,
                })
                .returning('id')
            )[0].id;
          }
        }
      }

      const newCaseId = (
        await db('cases')
          .insert({
            debtor_id: debtorId,
            case_number,
            contract_number,
            closing_date,
            lawyer_id,
            client_id,
            court_id,
            ssn_number_id,
            package_id,
            principal,
            interest,
            status_id,
            old_payment,
            our_taxes,
            warning_price,
            entering_date,
            lawyer_hand_over_date,
            comment,
            limitation_objection,
          })
          .returning('id')
      )[0].id;

      if (business_numbers && business_numbers.length > 0) {
        await Promise.all(
          business_numbers.map(async (businessNumber) => {
            // Check if the business number already exists
            const existingBusinessNumber = (
              await db('business_numbers')
                .select('id')
                .where({ number: businessNumber })
                .first()
            )?.id;

            let businessNumberId: number = existingBusinessNumber;

            if (!existingBusinessNumber) {
              businessNumberId = (
                await db('business_numbers')
                  .insert({
                    number: businessNumber,
                  })
                  .returning('id')
              )[0]?.id;
            }

            await db('case_business_numbers').insert({
              business_number_id: businessNumberId,
              case_id: newCaseId,
            });
          }),
        );
      }

      if (phone_numbers && phone_numbers.length > 0) {
        await Promise.all(
          phone_numbers.map(async (phoneNumber: string) => {
            const displayNumber = mapPhoneNumberForDisplay(phoneNumber);
            const existingPhoneNumber = await db('phone_numbers')
              .where({ display_number: displayNumber })
              .first();

            if (!existingPhoneNumber) {
              await db('phone_numbers').insert({
                number: phoneNumber,
                display_number: displayNumber,
                debtor_id: debtorId,
              });
            }
          }),
        );
      }

      if (executor_ids && executor_ids.length > 0) {
        for (const executor_id of executor_ids) {
          await db('case_executors').insert({
            executor_id,
            case_id: newCaseId,
          });
        }
      }
      newCaseIds.push(newCaseId);
    }

    res.status(200);
    return mapApiToResponse(
      200,
      `messages.fileImportSuccess`,
      newCaseIds.length,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
