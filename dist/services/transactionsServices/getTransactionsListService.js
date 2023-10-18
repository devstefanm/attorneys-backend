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
exports.getTransactionsListService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var universalHelpers_1 = require("../helpers/universalHelpers");
var casesHelpers_1 = require("../helpers/casesHelpers");
var getTransactionsListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, sort, _c, sortBy, _d, size, _e, page, debtors_name, amount, posting_method, case_number, excerpt_number, _f, filter, filterableDate, offset, upperCaseTransactionsList, totalCountQuery, transactionsQuery, nameForSearch, namesArr_1, amountValue, postingMethod_1, caseNumber, excerptNumber, totalAmount, transactionAmounts, _g, totalCountResult, transactions, totalTransactions, totalPages, apiResponse, error_1;
    var _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _k.trys.push([0, 4, , 5]);
                _a = req.query, _b = _a.sort, sort = _b === void 0 ? 'desc' : _b, _c = _a.sortBy, sortBy = _c === void 0 ? 't.created_at' : _c, _d = _a.size, size = _d === void 0 ? 25 : _d, _e = _a.page, page = _e === void 0 ? 1 : _e, debtors_name = _a.debtors_name, amount = _a.amount, posting_method = _a.posting_method, case_number = _a.case_number, excerpt_number = _a.excerpt_number, _f = _a.filter, filter = _f === void 0 ? 'payment' : _f, filterableDate = _a.filterableDate;
                offset = (Number(page) - 1) * Number(size);
                upperCaseTransactionsList = 'transactionsList'.toUpperCase();
                totalCountQuery = (0, attorneys_db_1.db)('transactions as t')
                    .select(attorneys_db_1.db.raw('COUNT(DISTINCT t.id) as total_transactions'))
                    .leftJoin('cases as c', 't.case_id', 'c.id')
                    .leftJoin('excerpts as e', 't.excerpt_id', 'e.id')
                    .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
                    .leftJoin('people as p', 'd.person_id', 'p.id')
                    .leftJoin('organizations as o', 'd.organization_id', 'o.id')
                    .first();
                transactionsQuery = (0, attorneys_db_1.db)('transactions as t')
                    .select('t.id', 't.type', 't.amount', 't.posting_method', 't.payment_date', 'c.case_number', 'e.excerpt_number', 'p.first_name', 'p.last_name', 'o.name')
                    .leftJoin('cases as c', 't.case_id', 'c.id')
                    .leftJoin('excerpts as e', 't.excerpt_id', 'e.id')
                    .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
                    .leftJoin('people as p', 'd.person_id', 'p.id')
                    .leftJoin('organizations as o', 'd.organization_id', 'o.id');
                if (filter) {
                    transactionsQuery.where('t.type', filter);
                    totalCountQuery.where('t.type', filter);
                }
                if (filterableDate) {
                    transactionsQuery.where('t.payment_date', '<', filterableDate);
                    totalCountQuery.where('t.payment_date', '<', filterableDate);
                }
                switch (sortBy) {
                    case 'debtors_name':
                        transactionsQuery
                            .orderBy('p.first_name', sort)
                            .orderBy('o.name', sort);
                        break;
                    case 'type':
                        transactionsQuery.orderBy('t.type', sort);
                        break;
                    case 'amount':
                        transactionsQuery.orderBy('t.amount', sort);
                        break;
                    case 'posting_method':
                        transactionsQuery.orderBy('t.posting_method', sort);
                        break;
                    case 'payment_date':
                        transactionsQuery.orderBy('t.payment_date', sort);
                        break;
                    case 'case_number':
                        transactionsQuery.orderBy('c.case_number', sort);
                        break;
                    case 'excerpt_number':
                        transactionsQuery.orderBy('e.excerpt_number', sort);
                        break;
                    default:
                        transactionsQuery.orderBy('t.created_at', 'desc');
                        break;
                }
                if (debtors_name) {
                    nameForSearch = debtors_name;
                    namesArr_1 = (0, universalHelpers_1.specialCharactersChecker)(nameForSearch);
                    transactionsQuery.where(function () {
                        for (var _i = 0, namesArr_2 = namesArr_1; _i < namesArr_2.length; _i++) {
                            var term = namesArr_2[_i];
                            (0, casesHelpers_1.buildCasesNameSearchConditions)(this, term);
                        }
                    });
                    totalCountQuery.where(function () {
                        for (var _i = 0, namesArr_3 = namesArr_1; _i < namesArr_3.length; _i++) {
                            var term = namesArr_3[_i];
                            (0, casesHelpers_1.buildCasesNameSearchConditions)(this, term);
                        }
                    });
                }
                if (amount) {
                    amountValue = amount;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(transactionsQuery, amountValue, 't.amount');
                    (0, universalHelpers_1.generateBigIntSearchQuery)(totalCountQuery, amountValue, 't.amount');
                }
                if (posting_method) {
                    postingMethod_1 = posting_method;
                    transactionsQuery.where(function () {
                        this.whereRaw('LOWER(t.posting_method) LIKE ?', [
                            "%".concat(postingMethod_1.toLowerCase(), "%"),
                        ]);
                    });
                    totalCountQuery.where(function () {
                        this.whereRaw('LOWER(t.posting_method) LIKE ?', [
                            "%".concat(postingMethod_1.toLowerCase(), "%"),
                        ]);
                    });
                }
                if (case_number) {
                    caseNumber = case_number;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(transactionsQuery, caseNumber, 'c.case_number');
                    (0, universalHelpers_1.generateBigIntSearchQuery)(totalCountQuery, caseNumber, 'c.case_number');
                }
                if (excerpt_number) {
                    excerptNumber = excerpt_number;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(transactionsQuery, excerptNumber, 'e.excerpt_number');
                    (0, universalHelpers_1.generateBigIntSearchQuery)(totalCountQuery, excerptNumber, 'e.excerpt_number');
                }
                totalAmount = null;
                if (!filter) return [3 /*break*/, 2];
                return [4 /*yield*/, transactionsQuery];
            case 1:
                transactionAmounts = _k.sent();
                totalAmount = transactionAmounts.reduce(function (accumulator, currentValue) {
                    return accumulator + parseFloat(currentValue.amount);
                }, 0);
                _k.label = 2;
            case 2:
                transactionsQuery.offset(offset);
                transactionsQuery.limit(Number(size));
                return [4 /*yield*/, Promise.all([
                        totalCountQuery,
                        transactionsQuery,
                    ])];
            case 3:
                _g = _k.sent(), totalCountResult = _g[0], transactions = _g[1];
                if (transactions.length === 0 || !totalCountResult) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "".concat(upperCaseTransactionsList, ".NOT_FOUND"))];
                }
                totalTransactions = Number(totalCountResult.total_transactions);
                totalPages = Math.ceil(Number(totalTransactions) / Number(size));
                apiResponse = {
                    transactions: transactions,
                    total_amount: totalAmount === null || totalAmount === void 0 ? void 0 : totalAmount.toFixed(2),
                    meta: {
                        sort: (_h = sort) !== null && _h !== void 0 ? _h : 'asc',
                        sortBy: (_j = sortBy) !== null && _j !== void 0 ? _j : 'created_at',
                        total_number: totalTransactions,
                        total_pages: totalPages,
                        page: page,
                    },
                };
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "".concat(upperCaseTransactionsList, ".SUCCESSFULY_RETRIEVED_NAMES"), apiResponse)];
            case 4:
                error_1 = _k.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getTransactionsListService = getTransactionsListService;
