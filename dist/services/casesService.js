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
exports.getCasesListService = void 0;
var attorneys_db_1 = require("../attorneys-db");
var catchErrorStack_1 = __importDefault(require("../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../utils/mapApiToResponse"));
var universalHelpers_1 = require("./helpers/universalHelpers");
var casesHelpers_1 = require("./helpers/casesHelpers");
var getCasesListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, sort, _c, sortBy, _d, size, _e, page, name, jmbg_pib, case_number, contract_number, lawyer, offset, upperCaseCasesList, totalCountQuery, casesQuery, nameForSearch, namesArr_1, jmbgPibNumber, caseNumber, contractNumber, lawyerForSearch, lawyersArr_1, _f, totalCountResult, cases, totalCases, totalPages, apiResponse, error_1;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 2, , 3]);
                _a = req.query, _b = _a.sort, sort = _b === void 0 ? 'asc' : _b, _c = _a.sortBy, sortBy = _c === void 0 ? 'c.created_at' : _c, _d = _a.size, size = _d === void 0 ? 10 : _d, _e = _a.page, page = _e === void 0 ? 1 : _e, name = _a.name, jmbg_pib = _a.jmbg_pib, case_number = _a.case_number, contract_number = _a.contract_number, lawyer = _a.lawyer;
                offset = (Number(page) - 1) * Number(size);
                upperCaseCasesList = 'casesList'.toUpperCase();
                totalCountQuery = (0, attorneys_db_1.db)('cases as c')
                    .count('c.id as total_cases')
                    .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
                    .leftJoin('people as p', 'd.person_id', 'p.id')
                    .leftJoin('organizations as o', 'd.organization_id', 'o.id')
                    .leftJoin('lawyers as l', 'c.lawyer_id', 'l.id')
                    .leftJoin('clients as cl', 'c.client_id', 'cl.id')
                    .leftJoin('courts as co', 'c.court_id', 'co.id')
                    .leftJoin('ssn_numbers as s', 'c.ssn_number_id', 's.id')
                    .leftJoin('packages as pck', 'c.package_id', 'pck.id');
                casesQuery = (0, attorneys_db_1.db)('cases as c')
                    .select('c.id', 'c.case_number', 'c.contract_number', 'c.status', 'c.principal', 'c.interest', 'd.is_legal', 'd.cession', 'p.first_name', 'p.last_name', 'p.jmbg', 'o.name', 'o.pib', 'l.office_name as lawyer_office_name', 'l.first_name as lawyer_first_name', 'l.last_name as lawyer_last_name', 'cl.name as client_name', 'co.name as court_name', 's.ssn as ssn', 'pck.package_name as package')
                    .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
                    .leftJoin('people as p', 'd.person_id', 'p.id')
                    .leftJoin('organizations as o', 'd.organization_id', 'o.id')
                    .leftJoin('lawyers as l', 'c.lawyer_id', 'l.id')
                    .leftJoin('clients as cl', 'c.client_id', 'cl.id')
                    .leftJoin('courts as co', 'c.court_id', 'co.id')
                    .leftJoin('ssn_numbers as s', 'c.ssn_number_id', 's.id')
                    .leftJoin('packages as pck', 'c.package_id', 'pck.id')
                    .offset(offset)
                    .limit(Number(size));
                switch (sortBy) {
                    case 'name':
                        casesQuery
                            .orderBy('p.first_name', sort)
                            .orderBy('o.name', sort);
                        break;
                    case 'jmbg_pib':
                        casesQuery
                            .orderBy('p.jmbg', sort)
                            .orderBy('o.pib', sort);
                        break;
                    case 'case_number':
                        casesQuery.orderBy('p.jmbg', sort);
                        break;
                    case 'contract_number':
                        casesQuery.orderBy('c.contract_number', sort);
                        break;
                    case 'lawyer':
                        casesQuery
                            .orderBy('l.office_name', sort)
                            .orderBy('l.first_name', sort);
                        break;
                    case 'cession':
                        casesQuery.orderBy('d.cession', sort);
                        break;
                    case 'ssn':
                        casesQuery.orderBy('s.ssn', sort);
                        break;
                    case 'package':
                        casesQuery.orderBy('pck.package_name', sort);
                        break;
                    case 'client':
                        casesQuery.orderBy('cl.name', sort);
                        break;
                    case 'court':
                        casesQuery.orderBy('co.name', sort);
                        break;
                    case 'principal':
                        casesQuery.orderBy('c.principal', sort);
                        break;
                    case 'interest':
                        casesQuery.orderBy('c.interest', sort);
                        break;
                    default:
                        casesQuery.orderBy('c.created_at', 'asc');
                        break;
                }
                if (name) {
                    nameForSearch = name;
                    namesArr_1 = (0, universalHelpers_1.specialCharactersChecker)(nameForSearch);
                    casesQuery.where(function () {
                        for (var _i = 0, namesArr_2 = namesArr_1; _i < namesArr_2.length; _i++) {
                            var term = namesArr_2[_i];
                            (0, casesHelpers_1.buildNameSearchConditions)(this, term);
                        }
                    });
                    totalCountQuery.where(function () {
                        for (var _i = 0, namesArr_3 = namesArr_1; _i < namesArr_3.length; _i++) {
                            var term = namesArr_3[_i];
                            (0, casesHelpers_1.buildNameSearchConditions)(this, term);
                        }
                    });
                }
                if (jmbg_pib) {
                    jmbgPibNumber = jmbg_pib;
                    (0, casesHelpers_1.generateJmbgAndPibSearchQuery)(casesQuery, jmbgPibNumber);
                    (0, casesHelpers_1.generateJmbgAndPibSearchQuery)(totalCountQuery, jmbgPibNumber);
                }
                if (case_number) {
                    caseNumber = case_number;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(casesQuery, caseNumber, 'c.case_number');
                    (0, universalHelpers_1.generateBigIntSearchQuery)(totalCountQuery, caseNumber, 'c.case_number');
                }
                if (contract_number) {
                    contractNumber = contract_number;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(casesQuery, contractNumber, 'c.contract_number');
                    (0, universalHelpers_1.generateBigIntSearchQuery)(totalCountQuery, contractNumber, 'c.contract_number');
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
                    totalCountQuery.where(function () {
                        for (var _i = 0, lawyersArr_3 = lawyersArr_1; _i < lawyersArr_3.length; _i++) {
                            var term = lawyersArr_3[_i];
                            (0, casesHelpers_1.buildLawyerNameSearchConditions)(this, term);
                        }
                    });
                }
                return [4 /*yield*/, Promise.all([
                        totalCountQuery,
                        casesQuery,
                    ])];
            case 1:
                _f = _j.sent(), totalCountResult = _f[0], cases = _f[1];
                if (cases.length === 0 || !totalCountResult) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "".concat(upperCaseCasesList, ".NOT_FOUND"))];
                }
                totalCases = Number(totalCountResult[0].total_cases);
                totalPages = Math.ceil(Number(totalCases) / Number(size));
                apiResponse = {
                    cases: cases,
                    meta: {
                        sort: (_g = sort) !== null && _g !== void 0 ? _g : 'asc',
                        sortBy: (_h = sortBy) !== null && _h !== void 0 ? _h : 'created_at',
                        total_number: totalCases,
                        total_pages: totalPages,
                        page: page,
                    },
                };
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "".concat(upperCaseCasesList, ".SUCCESSFULY_RETRIEVED_NAMES"), apiResponse)];
            case 2:
                error_1 = _j.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCasesListService = getCasesListService;
