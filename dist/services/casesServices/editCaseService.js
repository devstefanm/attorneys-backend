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
exports.editCaseService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var phoneNumbersHelpers_1 = require("../helpers/phoneNumbersHelpers");
var casesTypes_1 = require("../../types/casesTypes");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var editCaseService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var caseId_1, _a, first_name, last_name, jmbg_1, employed, employer_id, name, pib_1, executor_ids, business_numbers, phone_numbers, cession, address, email, zip_code, city_id, case_number, contract_number, closing_date, lawyer_id, client_id, court_id, ssn_number_id, package_id, principal, interest, status, old_payment, our_taxes, warning_price, entering_date, lawyer_hand_over_date, comment, limitation_objection, updatedCaseFields, existingCase, debtorId_1, existingPerson, updatePersonFields, otherPersonId, otherDebtorId, existingOrganization, updateOrganizationFields, otherOrganizationId, otherDebtorId, _i, executor_ids_1, executor_id, existingDebtor, updatedDebtorFields, statusId, updatedCase, apiResponse, error_1;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 45, , 46]);
                caseId_1 = req.params.caseId;
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, jmbg_1 = _a.jmbg, employed = _a.employed, employer_id = _a.employer_id, name = _a.name, pib_1 = _a.pib, executor_ids = _a.executor_ids, business_numbers = _a.business_numbers, phone_numbers = _a.phone_numbers, cession = _a.cession, address = _a.address, email = _a.email, zip_code = _a.zip_code, city_id = _a.city_id, case_number = _a.case_number, contract_number = _a.contract_number, closing_date = _a.closing_date, lawyer_id = _a.lawyer_id, client_id = _a.client_id, court_id = _a.court_id, ssn_number_id = _a.ssn_number_id, package_id = _a.package_id, principal = _a.principal, interest = _a.interest, status = _a.status, old_payment = _a.old_payment, our_taxes = _a.our_taxes, warning_price = _a.warning_price, entering_date = _a.entering_date, lawyer_hand_over_date = _a.lawyer_hand_over_date, comment = _a.comment, limitation_objection = _a.limitation_objection;
                updatedCaseFields = {};
                if ((first_name === null || last_name === null) && !name) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noName")];
                }
                if ((!first_name || !last_name) && name === null) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noName")];
                }
                if (jmbg_1 === null) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noJMBG")];
                }
                if (case_number === null) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noCaseNumber")];
                }
                if (contract_number === null) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noContractNumber")];
                }
                if (client_id === null) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noClient")];
                }
                if (closing_date !== undefined && new Date(closing_date) > new Date()) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.closingDateLate")];
                }
                return [4 /*yield*/, (0, attorneys_db_1.db)('cases as c')
                        .select('c.case_number', 'c.contract_number', 'c.closing_date', 'c.lawyer_id', 'c.client_id', 'c.court_id', 'c.ssn_number_id', 'c.package_id', 'c.principal', 'c.interest', 'c.status_id', 'c.old_payment', 'c.our_taxes', 'c.warning_price', 'c.entering_date', 'c.lawyer_hand_over_date', 'c.comment', 'c.limitation_objection', 'c.debtor_id', 'c.state', 'd.person_id', 'd.organization_id')
                        .where('c.id', caseId_1)
                        .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
                        .first()];
            case 1:
                existingCase = _g.sent();
                if (!existingCase) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.caseNotFound", existingCase)];
                }
                if (business_numbers === null || business_numbers === void 0 ? void 0 : business_numbers.concat(phone_numbers, executor_ids).includes(null)) {
                    res.status(500);
                    return [2 /*return*/, (0, catchErrorStack_1.default)(res, 'errors.phoneNumberNull')];
                }
                debtorId_1 = existingCase.debtor_id;
                if (!existingCase.person_id) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                        .select('id', 'first_name', 'last_name', 'jmbg', 'employed', 'employer_id')
                        .where('id', existingCase.person_id)
                        .first()];
            case 2:
                existingPerson = _g.sent();
                if (!existingPerson) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.personNotFound", existingPerson)];
                }
                updatePersonFields = {};
                if (first_name !== undefined &&
                    existingPerson.first_name !== first_name) {
                    updatePersonFields.first_name = first_name;
                }
                if (last_name !== undefined && existingPerson.last_name !== last_name) {
                    updatePersonFields.last_name = last_name;
                }
                if (!(jmbg_1 !== undefined && existingPerson.jmbg !== jmbg_1)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                        .select('id')
                        .where('id', '<>', existingCase.person_id)
                        .andWhere(function () {
                        this.where('jmbg', jmbg_1);
                    })
                        .first()];
            case 3:
                otherPersonId = (_b = (_g.sent())) === null || _b === void 0 ? void 0 : _b.id;
                if (!otherPersonId) return [3 /*break*/, 8];
                existingPerson.id = otherPersonId;
                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                        .select('id')
                        .where('person_id', existingPerson.id)
                        .first()];
            case 4:
                otherDebtorId = (_c = (_g.sent())) === null || _c === void 0 ? void 0 : _c.id;
                if (!otherDebtorId) return [3 /*break*/, 5];
                debtorId_1 = otherDebtorId;
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors').update({ person_id: existingPerson.id })];
            case 6:
                _g.sent();
                _g.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                updatePersonFields.jmbg = jmbg_1;
                _g.label = 9;
            case 9:
                if (employer_id !== undefined &&
                    existingPerson.employer_id !== employer_id) {
                    updatePersonFields.employer_id = employer_id;
                }
                if (employed !== null &&
                    employed !== undefined &&
                    existingPerson.employed !== employed) {
                    updatePersonFields.employed = employed;
                    updatePersonFields.employer_id = null;
                }
                if (!(Object.keys(updatePersonFields).length > 0)) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, attorneys_db_1.db)('people')
                        .where('id', existingPerson.id)
                        .update(updatePersonFields)];
            case 10:
                _g.sent();
                _g.label = 11;
            case 11:
                if (!existingCase.organization_id) return [3 /*break*/, 21];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .select('id', 'name', 'pib')
                        .where('id', existingCase.organization_id)
                        .first()];
            case 12:
                existingOrganization = _g.sent();
                if (!existingOrganization) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.organizationNotFound", existingOrganization)];
                }
                updateOrganizationFields = {};
                if (name !== undefined && existingOrganization.name != name) {
                    updateOrganizationFields.name = name;
                }
                if (!(pib_1 !== undefined && existingOrganization.pib != pib_1)) return [3 /*break*/, 19];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .select('id')
                        .where('id', '<>', existingCase.organization_id)
                        .andWhere(function () {
                        this.where('pib', pib_1);
                    })
                        .first()];
            case 13:
                otherOrganizationId = (_d = (_g.sent())) === null || _d === void 0 ? void 0 : _d.id;
                if (!otherOrganizationId) return [3 /*break*/, 18];
                existingOrganization.id = otherOrganizationId;
                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                        .select('id')
                        .where('organization_id', existingOrganization.id)
                        .first()];
            case 14:
                otherDebtorId = (_e = (_g.sent())) === null || _e === void 0 ? void 0 : _e.id;
                if (!otherDebtorId) return [3 /*break*/, 15];
                debtorId_1 = otherDebtorId;
                return [3 /*break*/, 17];
            case 15: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors').update({
                    organization_id: existingOrganization.id,
                })];
            case 16:
                _g.sent();
                _g.label = 17;
            case 17: return [3 /*break*/, 19];
            case 18:
                updateOrganizationFields.pib = pib_1;
                _g.label = 19;
            case 19:
                if (!(Object.keys(updateOrganizationFields).length > 0)) return [3 /*break*/, 21];
                return [4 /*yield*/, (0, attorneys_db_1.db)('organizations')
                        .where('id', existingOrganization.id)
                        .update(updateOrganizationFields)];
            case 20:
                _g.sent();
                _g.label = 21;
            case 21:
                if (!(business_numbers !== undefined)) return [3 /*break*/, 24];
                return [4 /*yield*/, (0, attorneys_db_1.db)('case_business_numbers').where('case_id', caseId_1).del()];
            case 22:
                _g.sent();
                if (!(business_numbers.length > 0)) return [3 /*break*/, 24];
                return [4 /*yield*/, Promise.all(business_numbers.map(function (businessNumber) { return __awaiter(void 0, void 0, void 0, function () {
                        var existingBusinessNumberId;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, (0, attorneys_db_1.db)('business_numbers')
                                        .select('id')
                                        .where({ number: businessNumber })
                                        .first()];
                                case 1:
                                    existingBusinessNumberId = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.id;
                                    if (!!existingBusinessNumberId) return [3 /*break*/, 3];
                                    return [4 /*yield*/, (0, attorneys_db_1.db)('business_numbers')
                                            .insert({
                                            number: businessNumber,
                                        })
                                            .returning('id')];
                                case 2:
                                    existingBusinessNumberId = (_b.sent())[0].id;
                                    _b.label = 3;
                                case 3: return [4 /*yield*/, (0, attorneys_db_1.db)('case_business_numbers').insert({
                                        business_number_id: existingBusinessNumberId,
                                        case_id: caseId_1,
                                    })];
                                case 4:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 23:
                _g.sent();
                _g.label = 24;
            case 24:
                if (!(phone_numbers !== undefined)) return [3 /*break*/, 27];
                return [4 /*yield*/, (0, attorneys_db_1.db)('phone_numbers').where('debtor_id', debtorId_1).del()];
            case 25:
                _g.sent();
                if (!(phone_numbers.length > 0)) return [3 /*break*/, 27];
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
            case 26:
                _g.sent();
                _g.label = 27;
            case 27:
                if (!(executor_ids !== undefined)) return [3 /*break*/, 32];
                return [4 /*yield*/, (0, attorneys_db_1.db)('case_executors').where('case_id', caseId_1).del()];
            case 28:
                _g.sent();
                if (!(executor_ids.length > 0)) return [3 /*break*/, 32];
                _i = 0, executor_ids_1 = executor_ids;
                _g.label = 29;
            case 29:
                if (!(_i < executor_ids_1.length)) return [3 /*break*/, 32];
                executor_id = executor_ids_1[_i];
                return [4 /*yield*/, (0, attorneys_db_1.db)('case_executors').insert({
                        executor_id: executor_id,
                        case_id: caseId_1,
                    })];
            case 30:
                _g.sent();
                _g.label = 31;
            case 31:
                _i++;
                return [3 /*break*/, 29];
            case 32: return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                    .select('id', 'cession', 'address', 'email', 'zip_code', 'city_id')
                    .where('id', debtorId_1)
                    .first()];
            case 33:
                existingDebtor = _g.sent();
                updatedDebtorFields = {};
                if (!existingDebtor) return [3 /*break*/, 36];
                if (cession !== undefined && existingDebtor.cession !== cession) {
                    updatedDebtorFields.cession = cession;
                }
                if (address !== undefined && existingDebtor.address !== address) {
                    updatedDebtorFields.address = address;
                }
                if (email !== undefined && existingDebtor.email !== email) {
                    updatedDebtorFields.email = email;
                }
                if (zip_code !== undefined && existingDebtor.zip_code !== zip_code) {
                    updatedDebtorFields.zip_code = zip_code;
                }
                if (city_id !== undefined && existingDebtor.city_id !== city_id) {
                    updatedDebtorFields.city_id = city_id;
                }
                if (!(Object.keys(updatedDebtorFields).length > 0)) return [3 /*break*/, 35];
                return [4 /*yield*/, (0, attorneys_db_1.db)('debtors')
                        .where('id', existingDebtor.id)
                        .update(updatedDebtorFields)];
            case 34:
                _g.sent();
                _g.label = 35;
            case 35: return [3 /*break*/, 37];
            case 36:
                res.status(404);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.organizationNotFound", existingDebtor)];
            case 37:
                statusId = void 0;
                if (!status) return [3 /*break*/, 41];
                return [4 /*yield*/, (0, attorneys_db_1.db)('statuses').select('id').where('name', status).first()];
            case 38:
                statusId = (_f = (_g.sent())) === null || _f === void 0 ? void 0 : _f.id;
                if (!!statusId) return [3 /*break*/, 40];
                return [4 /*yield*/, (0, attorneys_db_1.db)('statuses').insert({ name: status }).returning('id')];
            case 39:
                statusId = (_g.sent())[0].id;
                _g.label = 40;
            case 40:
                if (statusId !== undefined && existingCase.status_id !== statusId) {
                    updatedCaseFields.status_id = statusId;
                }
                _g.label = 41;
            case 41:
                if (case_number !== undefined && existingCase.case_number !== case_number) {
                    updatedCaseFields.case_number = case_number;
                }
                if (contract_number !== undefined &&
                    existingCase.contract_number !== contract_number) {
                    updatedCaseFields.contract_number = contract_number;
                }
                if (closing_date !== undefined &&
                    existingCase.closing_date !== closing_date) {
                    updatedCaseFields.closing_date = closing_date;
                    if (closing_date === null || closing_date === '') {
                        updatedCaseFields.state = casesTypes_1.EState.active;
                    }
                    else {
                        updatedCaseFields.state = casesTypes_1.EState.closed;
                    }
                }
                if (lawyer_id !== undefined && existingCase.lawyer_id !== lawyer_id) {
                    updatedCaseFields.lawyer_id = lawyer_id;
                }
                if (client_id !== undefined && existingCase.client_id !== client_id) {
                    updatedCaseFields.client_id = client_id;
                }
                if (court_id !== undefined && existingCase.court_id !== court_id) {
                    updatedCaseFields.court_id = court_id;
                }
                if (ssn_number_id !== undefined &&
                    existingCase.ssn_number_id !== ssn_number_id) {
                    updatedCaseFields.ssn_number_id = ssn_number_id;
                }
                if (package_id !== undefined && existingCase.package_id !== package_id) {
                    updatedCaseFields.package_id = package_id;
                }
                if (principal !== undefined && existingCase.principal !== principal) {
                    updatedCaseFields.principal = principal;
                }
                if (interest !== undefined && existingCase.interest !== interest) {
                    updatedCaseFields.interest = interest;
                }
                if (debtorId_1 && existingCase.debtor_id !== debtorId_1) {
                    updatedCaseFields.debtor_id = debtorId_1;
                }
                if (old_payment && existingCase.old_payment !== old_payment) {
                    updatedCaseFields.old_payment = old_payment;
                }
                if (our_taxes && existingCase.our_taxes !== our_taxes) {
                    updatedCaseFields.our_taxes = our_taxes;
                }
                if (warning_price && existingCase.warning_price !== warning_price) {
                    updatedCaseFields.warning_price = warning_price;
                }
                if (entering_date && existingCase.entering_date !== entering_date) {
                    updatedCaseFields.entering_date = entering_date;
                }
                if (lawyer_hand_over_date &&
                    existingCase.lawyer_hand_over_date !== lawyer_hand_over_date) {
                    updatedCaseFields.lawyer_hand_over_date = lawyer_hand_over_date;
                }
                if (comment && existingCase.comment !== comment) {
                    updatedCaseFields.comment = comment;
                }
                if (limitation_objection &&
                    existingCase.limitation_objection !== limitation_objection) {
                    updatedCaseFields.limitation_objection = limitation_objection;
                }
                if (!(Object.keys(updatedCaseFields).length > 0)) return [3 /*break*/, 43];
                // Update the case with the new data
                return [4 /*yield*/, (0, attorneys_db_1.db)('cases').where('id', caseId_1).update(updatedCaseFields)];
            case 42:
                // Update the case with the new data
                _g.sent();
                _g.label = 43;
            case 43: return [4 /*yield*/, (0, attorneys_db_1.db)('cases').where('id', caseId_1).first()];
            case 44:
                updatedCase = _g.sent();
                apiResponse = {
                    case_id: updatedCase,
                };
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.editCaseSuccess", apiResponse)];
            case 45:
                error_1 = _g.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 46: return [2 /*return*/];
        }
    });
}); };
exports.editCaseService = editCaseService;
