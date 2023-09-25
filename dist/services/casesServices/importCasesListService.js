"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCasesListService = void 0;
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var exceljs_1 = __importDefault(require("exceljs"));
var casesHelpers_1 = require("../helpers/casesHelpers");
var attorneys_db_1 = require("../../attorneys-db");
var universalHelpers_1 = require("../helpers/universalHelpers");
var transformData_1 = require("../../utils/transformData");
var phoneNumbersHelpers_1 = require("../helpers/phoneNumbersHelpers");
var importCasesListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uploadedFile, fileExtension, cases_2, workbook, worksheet, headerRow, reversedHeaders_1, csvBuffer, headers_1, newCaseIds, _loop_1, _i, cases_1, caseData, state_1, error_1;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 8, , 9]);
                if (!req.file) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "message.no_file")];
                }
                uploadedFile = req.file;
                fileExtension = uploadedFile.originalname.split('.').pop();
                cases_2 = [];
                if (!(fileExtension === 'xlsx')) return [3 /*break*/, 2];
                workbook = new exceljs_1.default.Workbook();
                return [4 /*yield*/, workbook.xlsx.load(uploadedFile.buffer)];
            case 1:
                _j.sent();
                worksheet = workbook.worksheets[0];
                headerRow = worksheet.getRow(1).values;
                reversedHeaders_1 = (0, casesHelpers_1.reverseHeaderMapping)(headerRow);
                worksheet.eachRow(function (row, rowNumber) {
                    if (rowNumber > 1) {
                        // Skip the header row if present
                        var rowData_1 = row.values;
                        var rowDataObject_1 = {};
                        // Create an object with keys from headers and values from the row
                        reversedHeaders_1.forEach(function (header, index) {
                            rowDataObject_1[header] = rowData_1[index];
                        });
                        var transformedRowDataObject = (0, casesHelpers_1.transformParsedDataToCase)(rowDataObject_1);
                        cases_2.push(transformedRowDataObject);
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                if (fileExtension === 'csv') {
                    csvBuffer = req.file.buffer;
                    headers_1 = [];
                    csvBuffer
                        .toString()
                        .split('\n')
                        .forEach(function (line, index) {
                        if (!line.trim()) {
                            return;
                        }
                        line = line.replace(/\r/g, '');
                        if (index === 0) {
                            headers_1.push.apply(headers_1, line.split(','));
                            headers_1 = (0, casesHelpers_1.reverseHeaderMapping)(headers_1);
                        }
                        else {
                            var dataRow_1 = line.split(',');
                            var rowDataObject_2 = {};
                            var skipRow_1 = false;
                            headers_1.forEach(function (header, columnIndex) {
                                if (dataRow_1[columnIndex] === undefined) {
                                    skipRow_1 = true;
                                    return;
                                }
                                rowDataObject_2[header] = dataRow_1[columnIndex];
                            });
                            var transformedRowDataObject = (0, casesHelpers_1.transformParsedDataToCase)(rowDataObject_2);
                            if (!skipRow_1) {
                                cases_2.push(transformedRowDataObject);
                            }
                        }
                    });
                }
                _j.label = 3;
            case 3:
                newCaseIds = [];
                _loop_1 = function (caseData) {
                    var first_name, last_name, jmbg, employed, employer, executors, name, pib, cession, address, email, zip_code, city, case_number, contract_number, closing_date, business_numbers, phone_numbers, lawyer_first_name, lawyer_last_name, lawyer_office_name, client, court, ssn, packageName, principal, interest, employer_id, city_id, client_id, court_id, _k, executor_ids, ssn_number_id, package_id, lawyer_id, is_legal, status_id, status, old_payment, our_taxes, warning_price, entering_date, lawyer_hand_over_date, comment, limitation_objection, existingCase, _l, executors_1, executor, words, firstName, lastName, executorId, debtorId, jmbgNumber, existingPerson, newPersonId, organizationName, organizationPib, existingOrganization, existingOrganizations, newOrganizationId, newOrganizationId, newOrganizationId, newCaseId, _m, executor_ids_1, executor_id;
                    return __generator(this, function (_o) {
                        switch (_o.label) {
                            case 0:
                                first_name = caseData.first_name, last_name = caseData.last_name, jmbg = caseData.jmbg, employed = caseData.employed, employer = caseData.employer, executors = caseData.executors, name = caseData.name, pib = caseData.pib, cession = caseData.cession, address = caseData.address, email = caseData.email, zip_code = caseData.zip_code, city = caseData.city, case_number = caseData.case_number, contract_number = caseData.contract_number, closing_date = caseData.closing_date, business_numbers = caseData.business_numbers, phone_numbers = caseData.phone_numbers, lawyer_first_name = caseData.lawyer_first_name, lawyer_last_name = caseData.lawyer_last_name, lawyer_office_name = caseData.lawyer_office_name, client = caseData.client, court = caseData.court, ssn = caseData.ssn, packageName = caseData.package, principal = caseData.principal, interest = caseData.interest, employer_id = caseData.employer_id, city_id = caseData.city_id, client_id = caseData.client_id, court_id = caseData.court_id, _k = caseData.executor_ids, executor_ids = _k === void 0 ? [] : _k, ssn_number_id = caseData.ssn_number_id, package_id = caseData.package_id, lawyer_id = caseData.lawyer_id, is_legal = caseData.is_legal, status_id = caseData.status_id, status = caseData.status, old_payment = caseData.old_payment, our_taxes = caseData.our_taxes, warning_price = caseData.warning_price, entering_date = caseData.entering_date, lawyer_hand_over_date = caseData.lawyer_hand_over_date, comment = caseData.comment, limitation_objection = caseData.limitation_objection;
                                if ((!first_name || !last_name || !jmbg) && !name) {
                                    res.status(400);
                                    return [2 /*return*/, { value: (0, mapApiToResponse_1.default)(400, "message.insufficient_personal_info") }];
                                }
                                if (employed === undefined ||
                                    employed === null ||
                                    employed === '' ||
                                    (employed && !employer)) {
                                    res.status(400);
                                    return [2 /*return*/, { value: (0, mapApiToResponse_1.default)(400, "message.no_employment_info") }];
                                }
                                if (cession === undefined ||
                                    cession === null ||
                                    cession === '' ||
                                    is_legal === undefined ||
                                    is_legal === null ||
                                    is_legal === '') {
                                    res.status(400);
                                    return [2 /*return*/, { value: (0, mapApiToResponse_1.default)(400, "message.no_debtor_info") }];
                                }
                                if (!(!contract_number || !case_number)) return [3 /*break*/, 1];
                                res.status(400);
                                return [2 /*return*/, { value: (0, mapApiToResponse_1.default)(400, "message.no_case_or_contract_number") }];
                            case 1: return [4 /*yield*/, (0, attorneys_db_1.db)('cases')
                                    .select('id', 'case_number', 'contract_number')
                                    .where('case_number', case_number)
                                    .orWhere('contract_number', contract_number)
                                    .first()];
                            case 2:
                                existingCase = _o.sent();
                                if (existingCase === null || existingCase === void 0 ? void 0 : existingCase.id) {
                                    res.status(400);
                                    return [2 /*return*/, { value: (0, mapApiToResponse_1.default)(400, "message.case_with_similar_case_or_contract_number_exists", "".concat(existingCase.case_number, ", ").concat(existingCase.contract_number)) }];
                                }
                                _o.label = 3;
                            case 3:
                                if (!status) return [3 /*break*/, 5];
                                return [4 /*yield*/, (0, universalHelpers_1.findRecordByNameOrCreateNew)(status, 'statuses', 'name')];
                            case 4:
                                status_id = _o.sent();
                                _o.label = 5;
                            case 5:
                                if (!city) return [3 /*break*/, 7];
                                return [4 /*yield*/, (0, universalHelpers_1.findRecordByNameOrCreateNew)((0, transformData_1.capitalizeEveryWord)(city), 'cities', 'name')];
                            case 6:
                                city_id = _o.sent();
                                _o.label = 7;
                            case 7:
                                if (!(employed && employer)) return [3 /*break*/, 9];
                                return [4 /*yield*/, (0, universalHelpers_1.findRecordByNameOrCreateNew)(employer, 'employers', 'name')];
                            case 8:
                                employer_id = _o.sent();
                                _o.label = 9;
                            case 9:
                                if (!client) return [3 /*break*/, 11];
                                return [4 /*yield*/, (0, universalHelpers_1.findRecordByNameOrCreateNew)(client, 'clients', 'name')];
                            case 10:
                                client_id = _o.sent();
                                return [3 /*break*/, 12];
                            case 11:
                                res.status(400);
                                return [2 /*return*/, { value: (0, mapApiToResponse_1.default)(400, "message.missing_client") }];
                            case 12:
                                if (!court) return [3 /*break*/, 14];
                                return [4 /*yield*/, (0, universalHelpers_1.findRecordByNameOrCreateNew)(court, 'courts', 'name')];
                            case 13:
                                court_id = _o.sent();
                                _o.label = 14;
                            case 14:
                                if (!ssn) return [3 /*break*/, 16];
                                return [4 /*yield*/, (0, universalHelpers_1.findRecordByNameOrCreateNew)(ssn, 'ssn_numbers', 'ssn')];
                            case 15:
                                ssn_number_id = _o.sent();
                                _o.label = 16;
                            case 16:
                                if (!packageName) return [3 /*break*/, 18];
                                return [4 /*yield*/, (0, universalHelpers_1.findRecordByNameOrCreateNew)(packageName, 'packages', 'package_name')];
                            case 17:
                                package_id = _o.sent();
                                _o.label = 18;
                            case 18:
                                if (!lawyer_first_name) return [3 /*break*/, 21];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('lawyers')
                                        .select('id')
                                        .where({
                                        first_name: lawyer_first_name,
                                        last_name: lawyer_last_name,
                                    })
                                        .first()];
                            case 19:
                                lawyer_id = (_a = (_o.sent())) === null || _a === void 0 ? void 0 : _a.id;
                                if (!!lawyer_id) return [3 /*break*/, 21];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('lawyers')
                                        .insert(__assign({ first_name: lawyer_first_name, last_name: lawyer_last_name }, (lawyer_office_name && { office_name: lawyer_office_name })))
                                        .returning('id')];
                            case 20:
                                lawyer_id = (_b = (_o.sent())[0]) === null || _b === void 0 ? void 0 : _b.id;
                                _o.label = 21;
                            case 21:
                                if (!(executors && executors.length > 0)) return [3 /*break*/, 27];
                                _l = 0, executors_1 = executors;
                                _o.label = 22;
                            case 22:
                                if (!(_l < executors_1.length)) return [3 /*break*/, 27];
                                executor = executors_1[_l];
                                words = executor.split(' ');
                                firstName = words.shift();
                                lastName = words.join(' ');
                                executorId = void 0;
                                return [4 /*yield*/, (0, attorneys_db_1.db)('executors')
                                        .select('id')
                                        .where({ first_name: firstName, last_name: lastName })
                                        .first()];
                            case 23:
                                executorId = (_c = (_o.sent())) === null || _c === void 0 ? void 0 : _c.id;
                                if (!!executorId) return [3 /*break*/, 25];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('executors')
                                        .insert({
                                        first_name: firstName,
                                        last_name: lastName,
                                        email: (0, casesHelpers_1.generateRandomString)(10),
                                    })
                                        .returning('id')];
                            case 24:
                                executorId = (_d = (_o.sent())[0]) === null || _d === void 0 ? void 0 : _d.id;
                                _o.label = 25;
                            case 25:
                                executor_ids.push(executorId);
                                _o.label = 26;
                            case 26:
                                _l++;
                                return [3 /*break*/, 22];
                            case 27:
                                if (!jmbg) return [3 /*break*/, 35];
                                jmbgNumber = jmbg;
                                return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                                        .where('jmbg', jmbgNumber)
                                        .first()];
                            case 28:
                                existingPerson = _o.sent();
                                if (!(existingPerson === null || existingPerson === void 0 ? void 0 : existingPerson.id)) return [3 /*break*/, 31];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('people').where('id', existingPerson.id).update({
                                        first_name: first_name,
                                        last_name: last_name,
                                        employed: employed,
                                        employer_id: employer_id,
                                    })];
                            case 29:
                                _o.sent();
                                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                                        .select('id')
                                        .where('person_id', existingPerson.id)
                                        .first()];
                            case 30:
                                debtorId = (_e = (_o.sent())) === null || _e === void 0 ? void 0 : _e.id;
                                return [3 /*break*/, 34];
                            case 31: return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                                    .insert({
                                    jmbg: jmbg,
                                    first_name: first_name,
                                    last_name: last_name,
                                    employed: employed,
                                    employer_id: employer_id,
                                })
                                    .returning('id')];
                            case 32:
                                newPersonId = (_o.sent())[0].id;
                                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                                        .insert({
                                        type: 'person',
                                        is_legal: false,
                                        person_id: Number(newPersonId),
                                        cession: cession,
                                        address: address,
                                        email: email,
                                        zip_code: zip_code,
                                        city_id: city_id,
                                    })
                                        .returning('id')];
                            case 33:
                                debtorId = (_o.sent())[0].id;
                                _o.label = 34;
                            case 34: return [3 /*break*/, 56];
                            case 35:
                                if (!(name || pib)) return [3 /*break*/, 56];
                                organizationName = name;
                                organizationPib = pib;
                                existingOrganization = void 0;
                                if (!organizationPib) return [3 /*break*/, 40];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                                        .where('pib', organizationPib)
                                        .first()];
                            case 36:
                                existingOrganization = _o.sent();
                                if (!(existingOrganization === null || existingOrganization === void 0 ? void 0 : existingOrganization.id)) return [3 /*break*/, 40];
                                if (!(((_f = existingOrganization.name) === null || _f === void 0 ? void 0 : _f.toLowerCase()) !==
                                    organizationName.toLowerCase())) return [3 /*break*/, 38];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                                        .where('id', existingOrganization.id)
                                        .update({ name: organizationName })];
                            case 37:
                                _o.sent();
                                _o.label = 38;
                            case 38: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                                    .select('id')
                                    .where('organization_id', existingOrganization.id)
                                    .first()];
                            case 39:
                                debtorId = (_g = (_o.sent())) === null || _g === void 0 ? void 0 : _g.id;
                                _o.label = 40;
                            case 40:
                                if (!!(existingOrganization === null || existingOrganization === void 0 ? void 0 : existingOrganization.id)) return [3 /*break*/, 56];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                                        .select('id', 'name', 'pib')
                                        .where('name', organizationName)];
                            case 41:
                                existingOrganizations = _o.sent();
                                if (!(existingOrganizations.length !== 0)) return [3 /*break*/, 53];
                                if (!(existingOrganizations.length === 1)) return [3 /*break*/, 49];
                                existingOrganization = existingOrganizations[0];
                                if (!!existingOrganization.pib) return [3 /*break*/, 45];
                                if (!organizationPib) return [3 /*break*/, 43];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                                        .where('id', existingOrganization.id)
                                        .update({ pib: organizationPib })];
                            case 42:
                                _o.sent();
                                _o.label = 43;
                            case 43: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                                    .select('id')
                                    .where('organization_id', existingOrganization.id)
                                    .first()];
                            case 44:
                                debtorId = (_h = (_o.sent())) === null || _h === void 0 ? void 0 : _h.id;
                                return [3 /*break*/, 48];
                            case 45: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                                    .insert({
                                    name: organizationName,
                                    pib: organizationPib,
                                })
                                    .returning('id')];
                            case 46:
                                newOrganizationId = (_o.sent())[0].id;
                                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                                        .insert({
                                        type: 'organization',
                                        is_legal: true,
                                        organization_id: newOrganizationId,
                                        cession: cession,
                                        address: address,
                                        email: email,
                                        zip_code: zip_code,
                                        city_id: city_id,
                                    })
                                        .returning('id')];
                            case 47:
                                debtorId = (_o.sent())[0].id;
                                _o.label = 48;
                            case 48: return [3 /*break*/, 52];
                            case 49: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                                    .insert({
                                    name: organizationName,
                                    pib: organizationPib,
                                })
                                    .returning('id')];
                            case 50:
                                newOrganizationId = (_o.sent())[0].id;
                                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                                        .insert({
                                        type: 'organization',
                                        is_legal: true,
                                        organization_id: newOrganizationId,
                                        cession: cession,
                                        address: address,
                                        email: email,
                                        zip_code: zip_code,
                                        city_id: city_id,
                                    })
                                        .returning('id')];
                            case 51:
                                debtorId = (_o.sent())[0].id;
                                _o.label = 52;
                            case 52: return [3 /*break*/, 56];
                            case 53: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                                    .insert({
                                    name: organizationName,
                                    pib: organizationPib,
                                })
                                    .returning('id')];
                            case 54:
                                newOrganizationId = (_o.sent())[0].id;
                                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                                        .insert({
                                        type: 'organization',
                                        is_legal: true,
                                        organization_id: newOrganizationId,
                                        cession: cession,
                                        address: address,
                                        email: email,
                                        zip_code: zip_code,
                                        city_id: city_id,
                                    })
                                        .returning('id')];
                            case 55:
                                debtorId = (_o.sent())[0].id;
                                _o.label = 56;
                            case 56: return [4 /*yield*/, (0, attorneys_db_1.db)('cases')
                                    .insert({
                                    debtor_id: debtorId,
                                    case_number: case_number,
                                    contract_number: contract_number,
                                    closing_date: closing_date,
                                    lawyer_id: lawyer_id,
                                    client_id: client_id,
                                    court_id: court_id,
                                    ssn_number_id: ssn_number_id,
                                    package_id: package_id,
                                    principal: principal,
                                    interest: interest,
                                    status_id: status_id,
                                    old_payment: old_payment,
                                    our_taxes: our_taxes,
                                    warning_price: warning_price,
                                    entering_date: entering_date,
                                    lawyer_hand_over_date: lawyer_hand_over_date,
                                    comment: comment,
                                    limitation_objection: limitation_objection,
                                })
                                    .returning('id')];
                            case 57:
                                newCaseId = (_o.sent())[0].id;
                                if (!(business_numbers && business_numbers.length > 0)) return [3 /*break*/, 59];
                                return [4 /*yield*/, Promise.all(business_numbers.map(function (businessNumber) { return __awaiter(void 0, void 0, void 0, function () {
                                        var existingBusinessNumber, businessNumberId;
                                        var _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0: return [4 /*yield*/, (0, attorneys_db_1.db)('business_numbers')
                                                        .select('id')
                                                        .where({ number: businessNumber })
                                                        .first()];
                                                case 1:
                                                    existingBusinessNumber = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.id;
                                                    businessNumberId = existingBusinessNumber;
                                                    if (!!existingBusinessNumber) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, (0, attorneys_db_1.db)('business_numbers')
                                                            .insert({
                                                            number: businessNumber,
                                                        })
                                                            .returning('id')];
                                                case 2:
                                                    businessNumberId = (_b = (_c.sent())[0]) === null || _b === void 0 ? void 0 : _b.id;
                                                    _c.label = 3;
                                                case 3: return [4 /*yield*/, (0, attorneys_db_1.db)('case_business_numbers').insert({
                                                        business_number_id: businessNumberId,
                                                        case_id: newCaseId,
                                                    })];
                                                case 4:
                                                    _c.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }))];
                            case 58:
                                _o.sent();
                                _o.label = 59;
                            case 59:
                                if (!(phone_numbers && phone_numbers.length > 0)) return [3 /*break*/, 61];
                                return [4 /*yield*/, Promise.all(phone_numbers.map(function (phoneNumber) { return __awaiter(void 0, void 0, void 0, function () {
                                        var displayNumber, existingPhoneNumber;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    displayNumber = (0, phoneNumbersHelpers_1.mapPhoneNumberForDisplay)(phoneNumber);
                                                    return [4 /*yield*/, (0, attorneys_db_1.db)('phone_numbers')
                                                            .where({ display_number: displayNumber })
                                                            .first()];
                                                case 1:
                                                    existingPhoneNumber = _a.sent();
                                                    if (!!existingPhoneNumber) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, (0, attorneys_db_1.db)('phone_numbers').insert({
                                                            number: phoneNumber,
                                                            display_number: displayNumber,
                                                            debtor_id: debtorId,
                                                        })];
                                                case 2:
                                                    _a.sent();
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); }))];
                            case 60:
                                _o.sent();
                                _o.label = 61;
                            case 61:
                                if (!(executor_ids && executor_ids.length > 0)) return [3 /*break*/, 65];
                                _m = 0, executor_ids_1 = executor_ids;
                                _o.label = 62;
                            case 62:
                                if (!(_m < executor_ids_1.length)) return [3 /*break*/, 65];
                                executor_id = executor_ids_1[_m];
                                return [4 /*yield*/, (0, attorneys_db_1.db)('case_executors').insert({
                                        executor_id: executor_id,
                                        case_id: newCaseId,
                                    })];
                            case 63:
                                _o.sent();
                                _o.label = 64;
                            case 64:
                                _m++;
                                return [3 /*break*/, 62];
                            case 65:
                                newCaseIds.push(newCaseId);
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, cases_1 = cases_2;
                _j.label = 4;
            case 4:
                if (!(_i < cases_1.length)) return [3 /*break*/, 7];
                caseData = cases_1[_i];
                return [5 /*yield**/, _loop_1(caseData)];
            case 5:
                state_1 = _j.sent();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _j.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "message.file_successfully_read_and_cases_imported", newCaseIds.length)];
            case 8:
                error_1 = _j.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.importCasesListService = importCasesListService;