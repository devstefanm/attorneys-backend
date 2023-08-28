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
exports.getLawyersListService = exports.getLawyersNamesService = void 0;
var catchErrorStack_1 = __importDefault(require("../utils/catchErrorStack"));
var universalHelpers_1 = require("./helpers/universalHelpers");
var mapApiToResponse_1 = __importDefault(require("../utils/mapApiToResponse"));
var attorneys_db_1 = require("../attorneys-db");
var lawyersHelpers_1 = require("./helpers/lawyersHelpers");
var getLawyersNamesService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, universalHelpers_1.getFullNamesServiceTemplate)('lawyers')(req, res)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLawyersNamesService = getLawyersNamesService;
var getLawyersListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, sort, _c, sortBy, _d, size, _e, page, office_name, name, email, offset, upperCaseLawyersList, totalCountQuery, lawyersQuery, nameForSearch, namesArr_1, officeName, namesArr_2, emailAddress_1, _f, totalCountResult, lawyers, totalLawyers, totalPages, apiResponse, error_2;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 2, , 3]);
                _a = req.query, _b = _a.sort, sort = _b === void 0 ? 'asc' : _b, _c = _a.sortBy, sortBy = _c === void 0 ? 'l.created_at' : _c, _d = _a.size, size = _d === void 0 ? 10 : _d, _e = _a.page, page = _e === void 0 ? 1 : _e, office_name = _a.office_name, name = _a.name, email = _a.email;
                offset = (Number(page) - 1) * Number(size);
                upperCaseLawyersList = 'lawyersList'.toUpperCase();
                totalCountQuery = (0, attorneys_db_1.db)('lawyers as l')
                    .select(attorneys_db_1.db.raw('COUNT(DISTINCT l.id) as total_lawyers'))
                    .leftJoin('cases as c', 'l.id', 'c.lawyer_id')
                    .leftJoin('cities as ci', 'l.city_id', 'ci.id')
                    .leftJoin('phone_numbers as pn', 'l.id', 'pn.lawyer_id')
                    .first();
                lawyersQuery = (0, attorneys_db_1.db)('lawyers as l')
                    .select('l.first_name', 'l.last_name', 'l.office_name', 'l.email', 'l.address', 'ci.name as city', 'pn.number as phone_number', 'pn.display_number as display_phone_number', attorneys_db_1.db.raw('COUNT(c.id) as case_count'))
                    .leftJoin('cases as c', 'l.id', 'c.lawyer_id')
                    .leftJoin('cities as ci', 'l.city_id', 'ci.id')
                    .leftJoin('phone_numbers as pn', 'l.id', 'pn.lawyer_id')
                    .offset(offset)
                    .limit(Number(size))
                    .groupBy('l.first_name', 'l.last_name', 'l.office_name', 'l.email', 'l.address', 'l.created_at', 'ci.name', 'pn.number', 'pn.display_number');
                switch (sortBy) {
                    case 'name':
                        lawyersQuery.orderBy('l.first_name', sort);
                        break;
                    case 'office_name':
                        lawyersQuery.orderBy('l.office_name', sort);
                        break;
                    case 'email':
                        lawyersQuery.orderBy('l.email', sort);
                        break;
                    case 'address':
                        lawyersQuery.orderBy('l.address', sort);
                        break;
                    case 'city':
                        lawyersQuery.orderBy('ci.name', sort);
                        break;
                    case 'display_phone_number':
                        lawyersQuery.orderBy('pn.display_number', sort);
                        break;
                    case 'number_of_cases':
                        lawyersQuery.orderBy('case_count', sort);
                        break;
                    default:
                        lawyersQuery.orderBy('l.created_at', 'asc');
                        break;
                }
                if (name) {
                    nameForSearch = name;
                    namesArr_1 = (0, universalHelpers_1.specialCharactersChecker)(nameForSearch);
                    lawyersQuery.where(function () {
                        for (var _i = 0, namesArr_3 = namesArr_1; _i < namesArr_3.length; _i++) {
                            var term = namesArr_3[_i];
                            (0, lawyersHelpers_1.buildLawyersNameSearchConditions)(this, term);
                        }
                    });
                    totalCountQuery.where(function () {
                        for (var _i = 0, namesArr_4 = namesArr_1; _i < namesArr_4.length; _i++) {
                            var term = namesArr_4[_i];
                            (0, lawyersHelpers_1.buildLawyersNameSearchConditions)(this, term);
                        }
                    });
                }
                if (office_name) {
                    officeName = office_name;
                    namesArr_2 = (0, universalHelpers_1.specialCharactersChecker)(officeName);
                    lawyersQuery.where(function () {
                        for (var _i = 0, namesArr_5 = namesArr_2; _i < namesArr_5.length; _i++) {
                            var term = namesArr_5[_i];
                            (0, lawyersHelpers_1.buildLawyersOfficeNameSearchConditions)(this, term);
                        }
                    });
                    totalCountQuery.where(function () {
                        for (var _i = 0, namesArr_6 = namesArr_2; _i < namesArr_6.length; _i++) {
                            var term = namesArr_6[_i];
                            (0, lawyersHelpers_1.buildLawyersOfficeNameSearchConditions)(this, term);
                        }
                    });
                }
                if (email) {
                    emailAddress_1 = email;
                    lawyersQuery.where(function () {
                        this.whereRaw('LOWER(l.email) LIKE ?', [
                            "%".concat(emailAddress_1.toLowerCase(), "%"),
                        ]);
                    });
                    totalCountQuery.where(function () {
                        this.whereRaw('LOWER(l.email) LIKE ?', [
                            "%".concat(emailAddress_1.toLowerCase(), "%"),
                        ]);
                    });
                }
                return [4 /*yield*/, Promise.all([
                        totalCountQuery,
                        lawyersQuery,
                    ])];
            case 1:
                _f = _j.sent(), totalCountResult = _f[0], lawyers = _f[1];
                if (lawyers.length === 0 || !totalCountResult) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "".concat(upperCaseLawyersList, ".NOT_FOUND"))];
                }
                totalLawyers = Number(totalCountResult.total_lawyers);
                totalPages = Math.ceil(Number(totalLawyers) / Number(size));
                apiResponse = {
                    lawyers: lawyers,
                    meta: {
                        sort: (_g = sort) !== null && _g !== void 0 ? _g : 'asc',
                        sortBy: (_h = sortBy) !== null && _h !== void 0 ? _h : 'created_at',
                        total_number: totalLawyers,
                        total_pages: totalPages,
                        page: page,
                    },
                };
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "".concat(upperCaseLawyersList, ".SUCCESSFULY_RETRIEVED_NAMES"), apiResponse)];
            case 2:
                error_2 = _j.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLawyersListService = getLawyersListService;
