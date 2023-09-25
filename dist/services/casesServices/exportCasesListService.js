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
exports.exportCasesListService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var universalHelpers_1 = require("../helpers/universalHelpers");
var casesHelpers_1 = require("../helpers/casesHelpers");
var fileGenerationUtil_1 = require("../../utils/fileGenerationUtil");
var casesServicesData_1 = require("./casesServicesData");
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var exportCasesListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, jmbg_pib, case_number, contract_number, lawyer, executors, ssn, package_name, business_numbers, _b, filter, _c, clientsFilter, _d, fileType, checkedProps, queryColumns, casesQuery, nameForSearch, namesArr_1, jmbgPibNumber, caseNumber, contractNumber, lawyerForSearch, lawyersArr_1, ssnNumber, packageName, packageNamesArr, businesNumberForSearch, businesNumbersArr, conditions, executorForSearch, executorsArr, conditions, cases, transformedCases, fileData, error_1;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 7, , 8]);
                _a = req.body, name = _a.name, jmbg_pib = _a.jmbg_pib, case_number = _a.case_number, contract_number = _a.contract_number, lawyer = _a.lawyer, executors = _a.executors, ssn = _a.ssn, package_name = _a.package, business_numbers = _a.business_numbers, _b = _a.filter, filter = _b === void 0 ? 'active' : _b, _c = _a.clientsFilter, clientsFilter = _c === void 0 ? '' : _c, _d = _a.fileType, fileType = _d === void 0 ? 'excel' : _d, checkedProps = _a.checkedProps;
                queryColumns = (0, casesHelpers_1.generateQueryColumns)(checkedProps);
                if (checkedProps.length === 0 || queryColumns.groupByColumns.length === 0) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "message.no_checked_props_or_not_valid_props")];
                }
                casesQuery = (_e = (_f = (0, attorneys_db_1.db)('cases as c'))
                    .select.apply(_f, queryColumns.selectColumns).leftJoin('debtors as d', 'c.debtor_id', 'd.id')
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
                    .leftJoin('phone_numbers as pn', 'd.id', 'pn.debtor_id'))
                    .groupBy.apply(_e, queryColumns.groupByColumns);
                if (filter) {
                    casesQuery.where('c.state', filter);
                }
                if (clientsFilter) {
                    casesQuery.where('c.client_id', clientsFilter);
                }
                if (name) {
                    nameForSearch = name;
                    namesArr_1 = (0, universalHelpers_1.specialCharactersChecker)(nameForSearch);
                    casesQuery.where(function () {
                        for (var _i = 0, namesArr_2 = namesArr_1; _i < namesArr_2.length; _i++) {
                            var term = namesArr_2[_i];
                            (0, casesHelpers_1.buildCasesNameSearchConditions)(this, term);
                        }
                    });
                }
                if (jmbg_pib) {
                    jmbgPibNumber = jmbg_pib;
                    (0, casesHelpers_1.generateJmbgAndPibSearchQuery)(casesQuery, jmbgPibNumber);
                }
                if (case_number) {
                    caseNumber = case_number;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(casesQuery, caseNumber, 'c.case_number');
                }
                if (contract_number) {
                    contractNumber = contract_number;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(casesQuery, contractNumber, 'c.contract_number');
                }
                if (lawyer) {
                    lawyerForSearch = lawyer;
                    lawyersArr_1 = (0, universalHelpers_1.specialCharactersChecker)(lawyerForSearch);
                    casesQuery.where(function () {
                        for (var _i = 0, lawyersArr_2 = lawyersArr_1; _i < lawyersArr_2.length; _i++) {
                            var term = lawyersArr_2[_i];
                            (0, casesHelpers_1.buildLawyerNameSearchConditions)(this, term);
                        }
                    });
                }
                if (ssn) {
                    ssnNumber = ssn;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(casesQuery, ssnNumber, 's.ssn');
                }
                if (package_name) {
                    packageName = package_name;
                    packageNamesArr = (0, universalHelpers_1.specialCharactersChecker)(packageName);
                    (0, universalHelpers_1.generateShortNameSearchQuery)(casesQuery, packageNamesArr, 'pck.package_name');
                }
                if (business_numbers) {
                    businesNumberForSearch = business_numbers;
                    businesNumbersArr = (0, universalHelpers_1.specialCharactersChecker)(businesNumberForSearch);
                    conditions = businesNumbersArr.map(function (searchTerm) {
                        return attorneys_db_1.db.raw("string_agg(distinct bn.number, ', ') ILIKE ?", [
                            "%".concat(searchTerm, "%"),
                        ]);
                    });
                    casesQuery.havingRaw(conditions.map(function (c) { return "(".concat(c, ")"); }).join(' OR '));
                }
                if (executors) {
                    executorForSearch = executors;
                    executorsArr = (0, universalHelpers_1.specialCharactersChecker)(executorForSearch);
                    conditions = executorsArr.map(function (searchTerm) {
                        return attorneys_db_1.db.raw("string_agg(e.first_name || ' ' || e.last_name, ', ') ILIKE ?", ["%".concat(searchTerm, "%")]);
                    });
                    casesQuery.havingRaw(conditions.map(function (c) { return "(".concat(c, ")"); }).join(' OR '));
                }
                return [4 /*yield*/, casesQuery];
            case 1:
                cases = _g.sent();
                transformedCases = (0, casesHelpers_1.transformCasesArraysToIndexedFields)(cases);
                if (transformedCases.length === 0) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "message.not_found", String(transformedCases.length))];
                }
                fileData = '';
                if (!(fileType === 'excel')) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, fileGenerationUtil_1.generateExcelFile)(transformedCases, casesServicesData_1.HeadersRecord, 'Cases')];
            case 2:
                // Generate Excel file from casesData
                fileData = _g.sent();
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=cases.xlsx');
                return [3 /*break*/, 6];
            case 3:
                if (!(fileType === 'csv')) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, fileGenerationUtil_1.generateCSVFile)(transformedCases, casesServicesData_1.HeadersRecord)];
            case 4:
                // Generate CSV file from casesData
                fileData = _g.sent();
                // Set the response headers to indicate a CSV file download
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename="cases.csv"');
                return [3 /*break*/, 6];
            case 5:
                res.status(400);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "message.invalid_file_type", fileData)];
            case 6: return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "message.file_exported_successfully", fileData)];
            case 7:
                error_1 = _g.sent();
                res.status(500);
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.exportCasesListService = exportCasesListService;
