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
exports.getSSNListService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var universalHelpers_1 = require("../helpers/universalHelpers");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var getSSNListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, sort, _c, sortBy, _d, size, _e, page, ssn, offset, upperCaseSSNList, totalCountQuery, ssnNumbersQuery, ssnNumber, _f, totalCountResult, ssnNumbers, totalSSN, totalPages, apiResponse, error_1;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 2, , 3]);
                _a = req.query, _b = _a.sort, sort = _b === void 0 ? 'desc' : _b, _c = _a.sortBy, sortBy = _c === void 0 ? 'ssn.created_at' : _c, _d = _a.size, size = _d === void 0 ? 25 : _d, _e = _a.page, page = _e === void 0 ? 1 : _e, ssn = _a.ssn;
                offset = (Number(page) - 1) * Number(size);
                upperCaseSSNList = 'ssnList'.toUpperCase();
                totalCountQuery = (0, attorneys_db_1.db)('ssn_numbers as ssn')
                    .select(attorneys_db_1.db.raw('COUNT(DISTINCT ssn.id) as total_ssn'))
                    .leftJoin('cases as c', 'ssn.id', 'c.ssn_number_id')
                    .first();
                ssnNumbersQuery = (0, attorneys_db_1.db)('ssn_numbers as ssn')
                    .select('ssn.id', 'ssn.ssn', attorneys_db_1.db.raw('COUNT(c.id) as case_count'))
                    .leftJoin('cases as c', 'ssn.id', 'c.ssn_number_id')
                    .offset(offset)
                    .limit(Number(size))
                    .groupBy('ssn.id', 'ssn.ssn', 'ssn.created_at');
                switch (sortBy) {
                    case 'ssn':
                        ssnNumbersQuery.orderBy('ssn.ssn', sort);
                        break;
                    case 'number_of_cases':
                        ssnNumbersQuery.orderBy('case_count', sort);
                        break;
                    default:
                        ssnNumbersQuery.orderBy('ssn.created_at', 'desc');
                        break;
                }
                if (ssn) {
                    ssnNumber = ssn;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(ssnNumbersQuery, ssnNumber, 'ssn.ssn');
                    (0, universalHelpers_1.generateBigIntSearchQuery)(totalCountQuery, ssnNumber, 'ssn.ssn');
                }
                return [4 /*yield*/, Promise.all([
                        totalCountQuery,
                        ssnNumbersQuery,
                    ])];
            case 1:
                _f = _j.sent(), totalCountResult = _f[0], ssnNumbers = _f[1];
                if (ssnNumbers.length === 0 || !totalCountResult) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "".concat(upperCaseSSNList, ".NOT_FOUND"))];
                }
                totalSSN = Number(totalCountResult.total_ssn);
                totalPages = Math.ceil(Number(totalSSN) / Number(size));
                apiResponse = {
                    ssn_numbers: ssnNumbers,
                    meta: {
                        sort: (_g = sort) !== null && _g !== void 0 ? _g : 'asc',
                        sortBy: (_h = sortBy) !== null && _h !== void 0 ? _h : 'created_at',
                        total_number: totalSSN,
                        total_pages: totalPages,
                        page: page,
                    },
                };
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "".concat(upperCaseSSNList, ".SUCCESSFULY_RETRIEVED_NAMES"), apiResponse)];
            case 2:
                error_1 = _j.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSSNListService = getSSNListService;
