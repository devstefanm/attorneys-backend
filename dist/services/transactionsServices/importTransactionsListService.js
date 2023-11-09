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
exports.importTransactionsListService = void 0;
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var exceljs_1 = __importDefault(require("exceljs"));
var transactionsHelpers_1 = require("../helpers/transactionsHelpers");
var attorneys_db_1 = require("../../attorneys-db");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var importTransactionsListService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uploadedFile, fileExtension, transactions_3, workbook, worksheet, headerRow, reversedHeaders_1, csvBuffer, headers_1, validationErrors, newTransactionIds, _i, transactions_1, transaction, amount, payment_date, type, case_number, caseId, parts, _a, transactions_2, transaction, amount, case_id, payment_date, posting_method, type, case_number, caseId, newTransactionId, error_1;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 13, , 14]);
                if (!req.file) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noFile")];
                }
                uploadedFile = req.file;
                fileExtension = uploadedFile.originalname.split('.').pop();
                transactions_3 = [];
                if (!(fileExtension === 'xlsx')) return [3 /*break*/, 2];
                workbook = new exceljs_1.default.Workbook();
                return [4 /*yield*/, workbook.xlsx.load(uploadedFile.buffer)];
            case 1:
                _e.sent();
                worksheet = workbook.worksheets[0];
                headerRow = worksheet.getRow(1).values;
                reversedHeaders_1 = (0, transactionsHelpers_1.reverseHeaderMapping)(headerRow);
                worksheet.eachRow(function (row, rowNumber) {
                    var _a;
                    if (rowNumber > 1) {
                        // Skip the header row if present
                        var rowData_1 = row.values;
                        var rowDataObject_1 = {};
                        // Create an object with keys from headers and values from the row
                        reversedHeaders_1.forEach(function (header, index) {
                            rowDataObject_1[header] = rowData_1[index];
                        });
                        if (rowDataObject_1.amount &&
                            typeof rowDataObject_1.amount === 'string') {
                            rowDataObject_1.amount = parseFloat((_a = rowDataObject_1.amount) === null || _a === void 0 ? void 0 : _a.replace(',', ''));
                        }
                        rowDataObject_1.type = (0, transactionsHelpers_1.transformTransactionType)(rowDataObject_1.type);
                        transactions_3.push(rowDataObject_1);
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                if (fileExtension === 'csv') {
                    csvBuffer = req.file.buffer;
                    headers_1 = [];
                    csvBuffer
                        .toString()
                        .split('\n')
                        .forEach(function (line, index) {
                        var _a;
                        if (!line.trim()) {
                            return;
                        }
                        line = line.replace(/\r/g, '');
                        if (index === 0) {
                            headers_1.push.apply(headers_1, line.split(','));
                            headers_1 = headers_1.map(function (header) { return (0, transactionsHelpers_1.trimSemicolons)(header); });
                            headers_1 = (0, transactionsHelpers_1.reverseHeaderMapping)(headers_1);
                        }
                        else {
                            var dataRow_1 = line.split(',');
                            var rowDataObject_2 = {};
                            var skipRow_1 = false;
                            headers_1.forEach(function (header, columnIndex) {
                                if (dataRow_1[columnIndex] === undefined) {
                                    skipRow_1 = true;
                                    return;
                                }
                                rowDataObject_2[header] = (0, transactionsHelpers_1.trimSemicolons)(dataRow_1[columnIndex]);
                            });
                            if (rowDataObject_2.amount &&
                                typeof rowDataObject_2.amount === 'string') {
                                rowDataObject_2.amount = parseFloat((_a = rowDataObject_2.amount) === null || _a === void 0 ? void 0 : _a.replace(',', ''));
                            }
                            rowDataObject_2.type = (0, transactionsHelpers_1.transformTransactionType)(rowDataObject_2.type);
                            if (!skipRow_1) {
                                transactions_3.push(rowDataObject_2);
                            }
                        }
                    });
                }
                _e.label = 3;
            case 3:
                validationErrors = [];
                newTransactionIds = [];
                _i = 0, transactions_1 = transactions_3;
                _e.label = 4;
            case 4:
                if (!(_i < transactions_1.length)) return [3 /*break*/, 7];
                transaction = transactions_1[_i];
                amount = transaction.amount, payment_date = transaction.payment_date, type = transaction.type, case_number = transaction.case_number;
                if (!case_number) {
                    validationErrors.push("entities.amount->".concat(amount, "->errors.errors.noCaseNumber"));
                }
                if (!amount) {
                    validationErrors.push("entities.caseNumber->".concat(case_number, "->errors.noAmount"));
                }
                if (!type) {
                    validationErrors.push("entities.caseNumber->".concat(case_number, "->errors.noType"));
                }
                if (type &&
                    !['payment', 'fee', 'legal_fee', 'withdrawal'].includes(type)) {
                    validationErrors.push("entities.caseNumber->".concat(case_number, "->errors.wrongType"));
                }
                if (!payment_date) {
                    validationErrors.push("entities.caseNumber->".concat(case_number, "->errors.noPaymentDate"));
                }
                return [4 /*yield*/, (0, attorneys_db_1.db)('cases').select('id').where('case_number', case_number).first()];
            case 5:
                caseId = (_b = (_e.sent())) === null || _b === void 0 ? void 0 : _b.id;
                if (!caseId) {
                    validationErrors.push("entities.caseNumber->".concat(case_number, "->errors.caseNumberWithoutCase"));
                }
                if (typeof payment_date === 'string') {
                    parts = payment_date.split('.');
                    if (parts.length === 3) {
                        payment_date = new Date("".concat(parts[2], "-").concat(parts[1], "-").concat(parts[0]));
                    }
                    else {
                        validationErrors.push("entities.caseNumber->".concat(case_number, "->errors.paymentDateWrongFormat"));
                    }
                }
                _e.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
                if (validationErrors.length > 0) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, validationErrors)];
                }
                _a = 0, transactions_2 = transactions_3;
                _e.label = 8;
            case 8:
                if (!(_a < transactions_2.length)) return [3 /*break*/, 12];
                transaction = transactions_2[_a];
                amount = transaction.amount, case_id = transaction.case_id, payment_date = transaction.payment_date, posting_method = transaction.posting_method, type = transaction.type, case_number = transaction.case_number;
                return [4 /*yield*/, (0, attorneys_db_1.db)('cases').select('id').where('case_number', case_number).first()];
            case 9:
                caseId = (_c = (_e.sent())) === null || _c === void 0 ? void 0 : _c.id;
                case_id = caseId;
                return [4 /*yield*/, (0, attorneys_db_1.db)('transactions')
                        .insert({
                        amount: amount,
                        type: type,
                        case_id: case_id,
                        payment_date: payment_date,
                        posting_method: posting_method,
                    })
                        .returning('id')];
            case 10:
                newTransactionId = (_d = (_e.sent())[0]) === null || _d === void 0 ? void 0 : _d.id;
                newTransactionIds.push(newTransactionId);
                _e.label = 11;
            case 11:
                _a++;
                return [3 /*break*/, 8];
            case 12:
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.fileImportSuccess", newTransactionIds.length)];
            case 13:
                error_1 = _e.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.importTransactionsListService = importTransactionsListService;
