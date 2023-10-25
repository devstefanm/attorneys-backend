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
exports.exportTransactionsListService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var casesHelpers_1 = require("../helpers/casesHelpers");
var universalHelpers_1 = require("../helpers/universalHelpers");
var fileGenerationUtil_1 = require("../../utils/fileGenerationUtil");
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var transformData_1 = require("../../utils/transformData");
var transactionsServicesData_1 = require("./transactionsServicesData");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var transactionsHelpers_1 = require("../helpers/transactionsHelpers");
var exportTransactionsListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, 
    // posting_method,
    debtors_name, amount, case_number, excerpt_number, _b, filter, filterableDate, _c, fileType, transactionsQuery, nameForSearch, namesArr_1, amountValue, caseNumber, excerptNumber, transactions, transformedTransactions, fileData, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                _a = req.body, debtors_name = _a.debtors_name, amount = _a.amount, case_number = _a.case_number, excerpt_number = _a.excerpt_number, _b = _a.filter, filter = _b === void 0 ? 'payment' : _b, filterableDate = _a.filterableDate, _c = _a.fileType, fileType = _c === void 0 ? 'excel' : _c;
                transactionsQuery = (0, attorneys_db_1.db)('transactions as t')
                    .select('t.type', 't.amount', 't.payment_date', 'c.case_number')
                    .leftJoin('cases as c', 't.case_id', 'c.id')
                    .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
                    .leftJoin('people as p', 'd.person_id', 'p.id')
                    .leftJoin('organizations as o', 'd.organization_id', 'o.id');
                if (filter) {
                    transactionsQuery.where('t.type', filter);
                }
                if (filterableDate) {
                    transactionsQuery.where('t.payment_date', '<', filterableDate);
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
                }
                //   if (posting_method) {
                //     const postingMethod = posting_method as string;
                //     transactionsQuery.where(function () {
                //       this.whereRaw('LOWER(t.posting_method) LIKE ?', [
                //         `%${postingMethod.toLowerCase()}%`,
                //       ]);
                //     });
                //   }
                if (amount) {
                    amountValue = amount;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(transactionsQuery, amountValue, 't.amount');
                }
                if (case_number) {
                    caseNumber = case_number;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(transactionsQuery, caseNumber, 'c.case_number');
                }
                if (excerpt_number) {
                    excerptNumber = excerpt_number;
                    (0, universalHelpers_1.generateBigIntSearchQuery)(transactionsQuery, excerptNumber, 'e.excerpt_number');
                }
                return [4 /*yield*/, transactionsQuery];
            case 1:
                transactions = _d.sent();
                if (transactions.length === 0) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.notFound")];
                }
                transformedTransactions = transactions.map(function (transaction) {
                    transaction.payment_date = (0, transformData_1.formatDateToDDMMYYYY)(transaction.payment_date);
                    if (transaction.type) {
                        transaction.type = (0, transactionsHelpers_1.transformTypeForExport)(transaction.type);
                    }
                    return transaction;
                });
                fileData = '';
                if (!(fileType === 'excel')) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, fileGenerationUtil_1.generateExcelFile)(transformedTransactions, transactionsServicesData_1.HeadersRecord, 'Cases')];
            case 2:
                // Generate Excel file from casesData
                fileData = _d.sent();
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=cases.xlsx');
                return [3 /*break*/, 6];
            case 3:
                if (!(fileType === 'csv')) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, fileGenerationUtil_1.generateCSVFile)(transformedTransactions, transactionsServicesData_1.HeadersRecord)];
            case 4:
                // Generate CSV file from casesData
                fileData = _d.sent();
                // Set the response headers to indicate a CSV file download
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename="cases.csv"');
                return [3 /*break*/, 6];
            case 5:
                res.status(400);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.invalidFileType", fileData)];
            case 6: return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.fileExportSuccess", fileData)];
            case 7:
                error_1 = _d.sent();
                res.status(500);
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.exportTransactionsListService = exportTransactionsListService;
