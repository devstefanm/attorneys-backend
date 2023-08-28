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
var attorneys_db_1 = require("../attorneys-db");
var catchErrorStack_1 = __importDefault(require("../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../utils/mapApiToResponse"));
var universalHelpers_1 = require("./helpers/universalHelpers");
var getTransactionsListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, sort, _c, sortBy, _d, size, _e, page, amount, posting_method, case_number, excerpt_number, offset, upperCaseTransactionsList, totalCountQuery, transactionsQuery, amountValue, postingMethod_1, caseNumber, excerptNumber, _f, totalCountResult, transactions, totalTransactions, totalPages, apiResponse, error_1;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 2, , 3]);
                _a = req.query, _b = _a.sort, sort = _b === void 0 ? 'desc' : _b, _c = _a.sortBy, sortBy = _c === void 0 ? 't.created_at' : _c, _d = _a.size, size = _d === void 0 ? 10 : _d, _e = _a.page, page = _e === void 0 ? 1 : _e, amount = _a.amount, posting_method = _a.posting_method, case_number = _a.case_number, excerpt_number = _a.excerpt_number;
                offset = (Number(page) - 1) * Number(size);
                upperCaseTransactionsList = 'transactionsList'.toUpperCase();
                totalCountQuery = (0, attorneys_db_1.db)('transactions as t')
                    .select(attorneys_db_1.db.raw('COUNT(DISTINCT t.id) as total_transactions'))
                    .leftJoin('cases as c', 't.case_id', 'c.id')
                    .leftJoin('excerpts as e', 't.excerpt_id', 'e.id')
                    .first();
                transactionsQuery = (0, attorneys_db_1.db)('transactions as t')
                    .select('t.id', 't.type', 't.amount', 't.posting_method', 't.payment_date', 'c.case_number', 'e.excerpt_number')
                    .leftJoin('cases as c', 't.case_id', 'c.id')
                    .leftJoin('excerpts as e', 't.excerpt_id', 'e.id')
                    .offset(offset)
                    .limit(Number(size));
                switch (sortBy) {
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
                return [4 /*yield*/, Promise.all([
                        totalCountQuery,
                        transactionsQuery,
                    ])];
            case 1:
                _f = _j.sent(), totalCountResult = _f[0], transactions = _f[1];
                if (transactions.length === 0 || !totalCountResult) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "".concat(upperCaseTransactionsList, ".NOT_FOUND"))];
                }
                totalTransactions = Number(totalCountResult.total_transactions);
                totalPages = Math.ceil(Number(totalTransactions) / Number(size));
                apiResponse = {
                    transactions: transactions,
                    meta: {
                        sort: (_g = sort) !== null && _g !== void 0 ? _g : 'asc',
                        sortBy: (_h = sortBy) !== null && _h !== void 0 ? _h : 'created_at',
                        total_number: totalTransactions,
                        total_pages: totalPages,
                        page: page,
                    },
                };
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "".concat(upperCaseTransactionsList, ".SUCCESSFULY_RETRIEVED_NAMES"), apiResponse)];
            case 2:
                error_1 = _j.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTransactionsListService = getTransactionsListService;
