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
exports.filterCaseNumbersService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var casesHelpers_1 = require("../helpers/casesHelpers");
var universalHelpers_1 = require("../helpers/universalHelpers");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var filterCaseNumbersService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, searchName, searchType, caseNumbersQuery, caseNumbers, namesArr_1, caseNumbers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                search = req.query.search;
                searchName = search;
                searchType = (0, casesHelpers_1.identifySearchedString)(searchName);
                caseNumbersQuery = void 0;
                if (!(!searchName ||
                    searchType === 'case_number' ||
                    searchType === 'unknown')) return [3 /*break*/, 2];
                caseNumbersQuery = (0, attorneys_db_1.db)('cases as c')
                    .select('c.id', 'c.case_number', 'p.first_name', 'p.last_name', 'o.name')
                    .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
                    .leftJoin('people as p', 'd.person_id', 'p.id')
                    .leftJoin('organizations as o', 'd.organization_id', 'o.id')
                    .limit(25);
                if (searchName) {
                    (0, universalHelpers_1.generateBigIntSearchQuery)(caseNumbersQuery, searchName, 'c.case_number');
                }
                return [4 /*yield*/, caseNumbersQuery];
            case 1:
                caseNumbers = _a.sent();
                if (caseNumbers.length === 0) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, 'filterCaseNumbers.not_found', caseNumbers)];
                }
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, 'filterCaseNumbers.successfully_retrieved', caseNumbers)];
            case 2:
                if (!(searchType === 'debtors_name')) return [3 /*break*/, 4];
                namesArr_1 = (0, universalHelpers_1.specialCharactersChecker)(searchName);
                caseNumbersQuery = (0, attorneys_db_1.db)('people as p')
                    .select(attorneys_db_1.db.raw('c.id::text'), attorneys_db_1.db.raw('c.case_number::text'), 'p.first_name', 'p.last_name', attorneys_db_1.db.raw('NULL as name'))
                    .leftJoin('debtors as d', 'p.id', 'd.person_id')
                    .leftJoin('cases as c', 'd.id', 'c.debtor_id')
                    .where(function () {
                    for (var _i = 0, namesArr_2 = namesArr_1; _i < namesArr_2.length; _i++) {
                        var term = namesArr_2[_i];
                        (0, casesHelpers_1.buildPeopleNameSearchConditions)(this, term);
                    }
                })
                    .union(function () {
                    this.select(attorneys_db_1.db.raw('ca.id::text'), attorneys_db_1.db.raw('ca.case_number::text'), attorneys_db_1.db.raw('NULL as first_name'), attorneys_db_1.db.raw('NULL as last_name'), 'o.name')
                        .from('organizations as o')
                        .leftJoin('debtors as de', 'o.id', 'de.organization_id')
                        .leftJoin('cases as ca', 'de.id', 'ca.debtor_id')
                        .where(function () {
                        var _loop_1 = function (term) {
                            this_1.orWhere(function () {
                                this.whereRaw("LOWER(o.name) LIKE ?", [
                                    "%".concat(term.toLowerCase(), "%"),
                                ]);
                            });
                        };
                        var this_1 = this;
                        for (var _i = 0, namesArr_3 = namesArr_1; _i < namesArr_3.length; _i++) {
                            var term = namesArr_3[_i];
                            _loop_1(term);
                        }
                    });
                });
                return [4 /*yield*/, caseNumbersQuery];
            case 3:
                caseNumbers = _a.sent();
                if (caseNumbers.length === 0) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, 'filterCaseNumbers.not_found', caseNumbers)];
                }
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, 'filterCaseNumbers.successfully_retrieved', caseNumbers)];
            case 4:
                res.status(404);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(404, 'filterCaseNumbers.not_found', [])];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.filterCaseNumbersService = filterCaseNumbersService;
