"use strict";
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
exports.createCaseService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var phoneNumbersHelpers_1 = require("../helpers/phoneNumbersHelpers");
var createCaseService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first_name, last_name, jmbg, employed, employer_id, executor_ids, name, pib, cession, address, email, zip_code, city_id, case_number, contract_number, closing_date, business_numbers, phone_numbers, lawyer_id, client_id, court_id, ssn_number_id, package_id, principal, interest, debtorId_1, jmbgNumber, existingPerson, newPersonId, organizationName, organizationPib, existingOrganization, existingOrganizations, newOrganizationId, newOrganizationId, newOrganizationId, newCaseId_1, _i, executor_ids_1, executor_id, apiResponse, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 39, , 40]);
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, jmbg = _a.jmbg, employed = _a.employed, employer_id = _a.employer_id, executor_ids = _a.executor_ids, name = _a.name, pib = _a.pib, cession = _a.cession, address = _a.address, email = _a.email, zip_code = _a.zip_code, city_id = _a.city_id, case_number = _a.case_number, contract_number = _a.contract_number, closing_date = _a.closing_date, business_numbers = _a.business_numbers, phone_numbers = _a.phone_numbers, lawyer_id = _a.lawyer_id, client_id = _a.client_id, court_id = _a.court_id, ssn_number_id = _a.ssn_number_id, package_id = _a.package_id, principal = _a.principal, interest = _a.interest;
                if (!jmbg) return [3 /*break*/, 8];
                jmbgNumber = jmbg;
                return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                        .where('jmbg', jmbgNumber)
                        .first()];
            case 1:
                existingPerson = _b.sent();
                if (!existingPerson) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, attorneys_db_1.db)('people').where('id', existingPerson.id).update({
                        first_name: first_name,
                        last_name: last_name,
                        employed: employed,
                        employer_id: employer_id,
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                        .select('id')
                        .where('person_id', existingPerson.id)
                        .first()];
            case 3:
                debtorId_1 = (_b.sent()).id;
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                    .insert({
                    jmbg: jmbg,
                    first_name: first_name,
                    last_name: last_name,
                    employed: employed,
                    employer_id: employer_id,
                })
                    .returning('id')];
            case 5:
                newPersonId = (_b.sent())[0].id;
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
                        entity_id: 1,
                    })
                        .returning('id')];
            case 6:
                debtorId_1 = (_b.sent())[0].id;
                _b.label = 7;
            case 7: return [3 /*break*/, 29];
            case 8:
                if (!(name || pib)) return [3 /*break*/, 29];
                organizationName = name;
                organizationPib = pib;
                existingOrganization = void 0;
                if (!organizationPib) return [3 /*break*/, 13];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .where('pib', organizationPib)
                        .first()];
            case 9:
                existingOrganization = _b.sent();
                if (!existingOrganization) return [3 /*break*/, 13];
                if (!(existingOrganization.name.toLowerCase() !==
                    organizationName.toLowerCase())) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .where('id', existingOrganization.id)
                        .update({ name: organizationName })];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                    .select('id')
                    .where('organization_id', existingOrganization.id)
                    .first()];
            case 12:
                debtorId_1 = (_b.sent()).id;
                _b.label = 13;
            case 13:
                if (!!existingOrganization) return [3 /*break*/, 29];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .select('id', 'name', 'pib')
                        .where('name', organizationName)];
            case 14:
                existingOrganizations = _b.sent();
                if (!(existingOrganizations.length !== 0)) return [3 /*break*/, 26];
                if (!(existingOrganizations.length === 1)) return [3 /*break*/, 22];
                existingOrganization = existingOrganizations[0];
                if (!!existingOrganization.pib) return [3 /*break*/, 18];
                if (!organizationPib) return [3 /*break*/, 16];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .where('id', existingOrganization.id)
                        .update({ pib: organizationPib })];
            case 15:
                _b.sent();
                _b.label = 16;
            case 16: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                    .select('id')
                    .where('organization_id', existingOrganization.id)
                    .first()];
            case 17:
                debtorId_1 = (_b.sent()).id;
                return [3 /*break*/, 21];
            case 18: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                    .insert({
                    name: organizationName,
                    pib: organizationPib,
                })
                    .returning('id')];
            case 19:
                newOrganizationId = (_b.sent())[0].id;
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
                        entity_id: 1,
                    })
                        .returning('id')];
            case 20:
                debtorId_1 = (_b.sent())[0].id;
                _b.label = 21;
            case 21: return [3 /*break*/, 25];
            case 22: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                    .insert({
                    name: organizationName,
                    pib: organizationPib,
                })
                    .returning('id')];
            case 23:
                newOrganizationId = (_b.sent())[0].id;
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
                        entity_id: 1,
                    })
                        .returning('id')];
            case 24:
                debtorId_1 = (_b.sent())[0].id;
                _b.label = 25;
            case 25: return [3 /*break*/, 29];
            case 26: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                    .insert({
                    name: organizationName,
                    pib: organizationPib,
                })
                    .returning('id')];
            case 27:
                newOrganizationId = (_b.sent())[0].id;
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
                        entity_id: 1,
                    })
                        .returning('id')];
            case 28:
                debtorId_1 = (_b.sent())[0].id;
                _b.label = 29;
            case 29: return [4 /*yield*/, (0, attorneys_db_1.db)('cases')
                    .insert({
                    debtor_id: debtorId_1,
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
                })
                    .returning('id')];
            case 30:
                newCaseId_1 = (_b.sent())[0].id;
                if (business_numbers.concat(phone_numbers, executor_ids).includes(null)) {
                    res.status(500);
                    (0, catchErrorStack_1.default)(res, 'Phone numbers, beiliffs nor business numbers cannot include null');
                }
                if (!(business_numbers && business_numbers.length > 0)) return [3 /*break*/, 32];
                return [4 /*yield*/, Promise.all(business_numbers.map(function (businessNumber) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingBusinessNumber, businessNumberId;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, attorneys_db_1.db)('business_numbers')
                                        .where({ number: businessNumber })
                                        .first()];
                                case 1:
                                    existingBusinessNumber = _a.sent();
                                    if (!!existingBusinessNumber) return [3 /*break*/, 4];
                                    return [4 /*yield*/, (0, attorneys_db_1.db)('business_numbers')
                                            .insert({
                                            number: businessNumber,
                                        })
                                            .returning('id')];
                                case 2:
                                    businessNumberId = (_a.sent())[0].id;
                                    return [4 /*yield*/, (0, attorneys_db_1.db)('case_business_numbers').insert({
                                            business_number_id: businessNumberId,
                                            case_id: newCaseId_1,
                                        })];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 31:
                _b.sent();
                _b.label = 32;
            case 32:
                if (!(phone_numbers && phone_numbers.length > 0)) return [3 /*break*/, 34];
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
                                            debtor_id: debtorId_1,
                                        })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 33:
                _b.sent();
                _b.label = 34;
            case 34:
                if (!(executor_ids && executor_ids.length > 0)) return [3 /*break*/, 38];
                _i = 0, executor_ids_1 = executor_ids;
                _b.label = 35;
            case 35:
                if (!(_i < executor_ids_1.length)) return [3 /*break*/, 38];
                executor_id = executor_ids_1[_i];
                return [4 /*yield*/, (0, attorneys_db_1.db)('case_executors').insert({
                        executor_id: executor_id,
                        case_id: newCaseId_1,
                    })];
            case 36:
                _b.sent();
                _b.label = 37;
            case 37:
                _i++;
                return [3 /*break*/, 35];
            case 38:
                apiResponse = undefined;
                if (newCaseId_1) {
                    apiResponse = {
                        case_id: newCaseId_1,
                    };
                    res.status(200);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "message.case_successfully_created", apiResponse)];
                }
                res.status(404);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "message.case_not_found", apiResponse)];
            case 39:
                error_1 = _b.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 40: return [2 /*return*/];
        }
    });
}); };
exports.createCaseService = createCaseService;
