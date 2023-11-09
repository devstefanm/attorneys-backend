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
exports.createCaseService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var phoneNumbersHelpers_1 = require("../helpers/phoneNumbersHelpers");
var createCaseService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first_name, last_name, jmbg, employed, employer_id, executor_ids, name, pib, cession, address, email, zip_code, city_id, case_number, contract_number, closing_date, business_numbers, phone_numbers, lawyer_id, client_id, court_id, ssn_number_id, package_id, principal, interest, status, old_payment, our_taxes, warning_price, entering_date, lawyer_hand_over_date, comment, limitation_objection, case_category, opposing_party_expense, debtorId_1, statusId, jmbgNumber, existingPerson, newPersonId, organizationName, organizationPib, existingOrganization, existingOrganizations, newOrganizationId, newOrganizationId, newOrganizationId, newCaseId_1, _i, executor_ids_1, executor_id, apiResponse, error_1;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 42, , 43]);
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, jmbg = _a.jmbg, employed = _a.employed, employer_id = _a.employer_id, executor_ids = _a.executor_ids, name = _a.name, pib = _a.pib, cession = _a.cession, address = _a.address, email = _a.email, zip_code = _a.zip_code, city_id = _a.city_id, case_number = _a.case_number, contract_number = _a.contract_number, closing_date = _a.closing_date, business_numbers = _a.business_numbers, phone_numbers = _a.phone_numbers, lawyer_id = _a.lawyer_id, client_id = _a.client_id, court_id = _a.court_id, ssn_number_id = _a.ssn_number_id, package_id = _a.package_id, principal = _a.principal, interest = _a.interest, status = _a.status, old_payment = _a.old_payment, our_taxes = _a.our_taxes, warning_price = _a.warning_price, entering_date = _a.entering_date, lawyer_hand_over_date = _a.lawyer_hand_over_date, comment = _a.comment, limitation_objection = _a.limitation_objection, case_category = _a.case_category, opposing_party_expense = _a.opposing_party_expense;
                if (business_numbers === null || business_numbers === void 0 ? void 0 : business_numbers.concat(phone_numbers, executor_ids).includes(null)) {
                    res.status(500);
                    return [2 /*return*/, (0, catchErrorStack_1.default)(res, 'errors.phoneNumberNull')];
                }
                if ((!first_name || !last_name) && !name) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noName")];
                }
                if (first_name && last_name && !jmbg) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noJMBG")];
                }
                if (!case_number) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noCaseNumber")];
                }
                if (!contract_number) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noContractNumber")];
                }
                if (!client_id) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noClient")];
                }
                if (closing_date !== undefined && new Date(closing_date) > new Date()) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.closingDateLate")];
                }
                statusId = void 0;
                if (!status) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, attorneys_db_1.db)('statuses').select('id').where('name', status).first()];
            case 1:
                statusId = (_b = (_g.sent())) === null || _b === void 0 ? void 0 : _b.id;
                if (!!statusId) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, attorneys_db_1.db)('statuses').insert({ name: status }).returning('id')];
            case 2:
                statusId = (_g.sent())[0].id;
                _g.label = 3;
            case 3:
                if (!jmbg) return [3 /*break*/, 11];
                jmbgNumber = jmbg;
                return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                        .where('jmbg', jmbgNumber)
                        .first()];
            case 4:
                existingPerson = _g.sent();
                if (!(existingPerson === null || existingPerson === void 0 ? void 0 : existingPerson.id)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, attorneys_db_1.db)('people').where('id', existingPerson.id).update({
                        first_name: first_name,
                        last_name: last_name,
                        employed: employed,
                        employer_id: employer_id,
                    })];
            case 5:
                _g.sent();
                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                        .select('id')
                        .where('person_id', existingPerson.id)
                        .first()];
            case 6:
                debtorId_1 = (_c = (_g.sent())) === null || _c === void 0 ? void 0 : _c.id;
                return [3 /*break*/, 10];
            case 7: return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                    .insert({
                    jmbg: jmbg,
                    first_name: first_name,
                    last_name: last_name,
                    employed: employed,
                    employer_id: employer_id,
                })
                    .returning('id')];
            case 8:
                newPersonId = (_g.sent())[0].id;
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
            case 9:
                debtorId_1 = (_g.sent())[0].id;
                _g.label = 10;
            case 10: return [3 /*break*/, 32];
            case 11:
                if (!(name || pib)) return [3 /*break*/, 32];
                organizationName = name;
                organizationPib = pib;
                existingOrganization = void 0;
                if (!organizationPib) return [3 /*break*/, 16];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .where('pib', organizationPib)
                        .first()];
            case 12:
                existingOrganization = _g.sent();
                if (!(existingOrganization === null || existingOrganization === void 0 ? void 0 : existingOrganization.id)) return [3 /*break*/, 16];
                if (!(((_d = existingOrganization.name) === null || _d === void 0 ? void 0 : _d.toLowerCase()) !==
                    organizationName.toLowerCase())) return [3 /*break*/, 14];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .where('id', existingOrganization.id)
                        .update({ name: organizationName })];
            case 13:
                _g.sent();
                _g.label = 14;
            case 14: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                    .select('id')
                    .where('organization_id', existingOrganization.id)
                    .first()];
            case 15:
                debtorId_1 = (_e = (_g.sent())) === null || _e === void 0 ? void 0 : _e.id;
                _g.label = 16;
            case 16:
                if (!!(existingOrganization === null || existingOrganization === void 0 ? void 0 : existingOrganization.id)) return [3 /*break*/, 32];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .select('id', 'name', 'pib')
                        .where('name', organizationName)];
            case 17:
                existingOrganizations = _g.sent();
                if (!(existingOrganizations.length !== 0)) return [3 /*break*/, 29];
                if (!(existingOrganizations.length === 1)) return [3 /*break*/, 25];
                existingOrganization = existingOrganizations[0];
                if (!!existingOrganization.pib) return [3 /*break*/, 21];
                if (!organizationPib) return [3 /*break*/, 19];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .where('id', existingOrganization.id)
                        .update({ pib: organizationPib })];
            case 18:
                _g.sent();
                _g.label = 19;
            case 19: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                    .select('id')
                    .where('organization_id', existingOrganization.id)
                    .first()];
            case 20:
                debtorId_1 = (_f = (_g.sent())) === null || _f === void 0 ? void 0 : _f.id;
                return [3 /*break*/, 24];
            case 21: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                    .insert({
                    name: organizationName,
                    pib: organizationPib,
                })
                    .returning('id')];
            case 22:
                newOrganizationId = (_g.sent())[0].id;
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
            case 23:
                debtorId_1 = (_g.sent())[0].id;
                _g.label = 24;
            case 24: return [3 /*break*/, 28];
            case 25: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                    .insert({
                    name: organizationName,
                    pib: organizationPib,
                })
                    .returning('id')];
            case 26:
                newOrganizationId = (_g.sent())[0].id;
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
            case 27:
                debtorId_1 = (_g.sent())[0].id;
                _g.label = 28;
            case 28: return [3 /*break*/, 32];
            case 29: return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                    .insert({
                    name: organizationName,
                    pib: organizationPib,
                })
                    .returning('id')];
            case 30:
                newOrganizationId = (_g.sent())[0].id;
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
            case 31:
                debtorId_1 = (_g.sent())[0].id;
                _g.label = 32;
            case 32: return [4 /*yield*/, (0, attorneys_db_1.db)('cases')
                    .insert(__assign({ debtor_id: debtorId_1, case_number: case_number, contract_number: contract_number, lawyer_id: lawyer_id, client_id: client_id, court_id: court_id, ssn_number_id: ssn_number_id, package_id: package_id, principal: principal, interest: interest, status_id: statusId, old_payment: old_payment, our_taxes: our_taxes, warning_price: warning_price, entering_date: entering_date, lawyer_hand_over_date: lawyer_hand_over_date, comment: comment, limitation_objection: limitation_objection, case_category: case_category, opposing_party_expense: opposing_party_expense, closing_date: closing_date }, (closing_date ? { state: 'closed' } : { state: 'active' })))
                    .returning('id')];
            case 33:
                newCaseId_1 = (_g.sent())[0].id;
                if (!(business_numbers && business_numbers.length > 0)) return [3 /*break*/, 35];
                return [4 /*yield*/, Promise.all(business_numbers.map(function (businessNumber) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingBusinessNumber, businessNumberId;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, (0, attorneys_db_1.db)('business_numbers')
                                        .select('id')
                                        .where({ number: businessNumber })
                                        .first()];
                                case 1:
                                    existingBusinessNumber = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.id;
                                    businessNumberId = existingBusinessNumber;
                                    if (!!existingBusinessNumber) return [3 /*break*/, 3];
                                    return [4 /*yield*/, (0, attorneys_db_1.db)('business_numbers')
                                            .insert({
                                            number: businessNumber,
                                        })
                                            .returning('id')];
                                case 2:
                                    businessNumberId = (_b.sent())[0].id;
                                    _b.label = 3;
                                case 3: return [4 /*yield*/, (0, attorneys_db_1.db)('case_business_numbers').insert({
                                        business_number_id: businessNumberId,
                                        case_id: newCaseId_1,
                                    })];
                                case 4:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 34:
                _g.sent();
                _g.label = 35;
            case 35:
                if (!(phone_numbers && phone_numbers.length > 0)) return [3 /*break*/, 37];
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
            case 36:
                _g.sent();
                _g.label = 37;
            case 37:
                if (!(executor_ids && executor_ids.length > 0)) return [3 /*break*/, 41];
                _i = 0, executor_ids_1 = executor_ids;
                _g.label = 38;
            case 38:
                if (!(_i < executor_ids_1.length)) return [3 /*break*/, 41];
                executor_id = executor_ids_1[_i];
                return [4 /*yield*/, (0, attorneys_db_1.db)('case_executors').insert({
                        executor_id: executor_id,
                        case_id: newCaseId_1,
                    })];
            case 39:
                _g.sent();
                _g.label = 40;
            case 40:
                _i++;
                return [3 /*break*/, 38];
            case 41:
                apiResponse = undefined;
                if (newCaseId_1) {
                    apiResponse = {
                        case_id: newCaseId_1,
                    };
                    res.status(200);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.createCaseSuccess", apiResponse)];
                }
                res.status(404);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.caseNotFound", apiResponse)];
            case 42:
                error_1 = _g.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 43: return [2 /*return*/];
        }
    });
}); };
exports.createCaseService = createCaseService;
