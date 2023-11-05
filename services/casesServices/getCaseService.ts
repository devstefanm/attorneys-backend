import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { calculateTypeSums } from 'services/helpers/casesHelpers';
import { ICaseApiResponseData } from 'types/casesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const getCaseService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICaseApiResponseData | undefined>> => {
  try {
    const { caseId } = req.params;

    const caseQuery = db('cases as c')
      .select(
        'c.id',
        'c.case_number',
        'c.contract_number',
        'c.closing_date',
        'c.state',
        'c.principal',
        'c.interest',
        'c.old_payment',
        'c.our_taxes',
        'c.warning_price',
        'c.entering_date',
        'c.lawyer_hand_over_date',
        'c.comment',
        'c.limitation_objection',
        'c.case_category',
        'c.opposing_party_expense',
        'd.is_legal',
        'd.cession',
        'd.address',
        'd.email',
        'd.zip_code',
        'p.first_name',
        'p.last_name',
        'p.jmbg',
        'p.employed',
        'o.name',
        'o.pib',
        'st.name as status',
        db.raw(
          "CASE WHEN COUNT(l.id) = 0 THEN null ELSE json_build_object('id', l.id, 'office_name', l.office_name, 'first_name', l.first_name, 'last_name', l.last_name) END as lawyer",
        ),
        db.raw(
          "CASE WHEN COUNT(s.id) = 0 THEN null ELSE json_build_object('id', s.id, 'ssn', s.ssn) END as ssn_number",
        ),
        db.raw(
          "CASE WHEN COUNT(pck.id) = 0 THEN null ELSE json_build_object('id', pck.id, 'package_name', pck.package_name) END as package",
        ),
        db.raw(
          "CASE WHEN COUNT(cl.id) = 0 THEN null ELSE json_build_object('id', cl.id, 'name', cl.name) END as client",
        ),
        db.raw(
          "CASE WHEN COUNT(co.id) = 0 THEN null ELSE json_build_object('id', co.id, 'name', co.name) END as court",
        ),
        db.raw(
          "CASE WHEN COUNT(ci.id) = 0 THEN null ELSE json_build_object('id', ci.id, 'name', ci.name) END as city",
        ),
        db.raw(
          "CASE WHEN COUNT(emp.id) = 0 THEN null ELSE json_build_object('id', emp.id, 'name', emp.name) END as employer",
        ),
        db.raw(
          "CASE WHEN COUNT(e.id) = 0 THEN null ELSE json_agg(distinct jsonb_build_object('id', e.id, 'first_name', e.first_name, 'last_name', e.last_name)) END as executors",
        ),
        db.raw(
          "CASE WHEN COUNT(bn.id) = 0 THEN null ELSE json_agg(distinct jsonb_build_object('id', bn.id, 'number', bn.number)) END as business_numbers",
        ),
        db.raw(
          'CASE WHEN COUNT(pn.number) = 0 THEN null ELSE json_agg(distinct pn.number) END as phone_numbers',
        ),
      )
      .where('c.id', caseId)
      .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
      .leftJoin('people as p', 'd.person_id', 'p.id')
      .leftJoin('organizations as o', 'd.organization_id', 'o.id')
      .leftJoin('lawyers as l', 'c.lawyer_id', 'l.id')
      .leftJoin('clients as cl', 'c.client_id', 'cl.id')
      .leftJoin('courts as co', 'c.court_id', 'co.id')
      .leftJoin('ssn_numbers as s', 'c.ssn_number_id', 's.id')
      .leftJoin('packages as pck', 'c.package_id', 'pck.id')
      .leftJoin('statuses as st', 'c.status_id', 'st.id')
      .leftJoin('case_executors as ce', 'c.id', 'ce.case_id')
      .leftJoin('executors as e', 'ce.executor_id', 'e.id')
      .leftJoin('case_business_numbers as cbn', 'c.id', 'cbn.case_id')
      .leftJoin('business_numbers as bn', 'cbn.business_number_id', 'bn.id')
      .leftJoin('cities as ci', 'd.city_id', 'ci.id')
      .leftJoin('employers as emp', 'p.employer_id', 'emp.id')
      .leftJoin('phone_numbers as pn', 'd.id', 'pn.debtor_id')
      .groupBy(
        'c.id',
        'c.case_number',
        'c.contract_number',
        'c.closing_date',
        'c.state',
        'c.principal',
        'c.interest',
        'c.old_payment',
        'c.our_taxes',
        'c.warning_price',
        'c.entering_date',
        'c.lawyer_hand_over_date',
        'c.comment',
        'c.limitation_objection',
        'c.case_category',
        'c.opposing_party_expense',
        'd.is_legal',
        'd.cession',
        'd.address',
        'd.email',
        'd.zip_code',
        'p.first_name',
        'p.last_name',
        'p.jmbg',
        'p.employed',
        'o.name',
        'o.pib',
        'l.id',
        'l.office_name',
        'l.first_name',
        'l.last_name',
        's.id',
        's.ssn',
        'pck.id',
        'pck.package_name',
        'st.name',
        'cl.id',
        'cl.name',
        'co.id',
        'co.name',
        'ci.id',
        'ci.name',
        'emp.id',
      )
      .first();

    const chosenCase = await caseQuery;

    if (!chosenCase) {
      res.status(404);
      return mapApiToResponse(404, `errors.caseNotFound`);
    }

    const caseTransactions = await db('transactions')
      .select('amount', 'type')
      .where('case_id', caseId);

    const sumOfTransactions = calculateTypeSums(caseTransactions);

    const apiResponse: ICaseApiResponseData = {
      ...chosenCase,
      ...sumOfTransactions,
    };

    res.status(200);
    return mapApiToResponse(200, `messages.retrieveCaseSuccess`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
