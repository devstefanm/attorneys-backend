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
exports.editLawyerService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var phoneNumbersHelpers_1 = require("../helpers/phoneNumbersHelpers");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var editLawyerService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lawyerId_1, _a, first_name, last_name, email, address, city_id, office_name, phone_numbers, existingLawyer, updateLawyerFields, updatedLawyer, apiResponse, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                lawyerId_1 = req.params.lawyerId;
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, address = _a.address, city_id = _a.city_id, office_name = _a.office_name, phone_numbers = _a.phone_numbers;
                if (first_name === null || first_name === '') {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noName")];
                }
                if (phone_numbers === null || phone_numbers === void 0 ? void 0 : phone_numbers.includes(null)) {
                    res.status(500);
                    return [2 /*return*/, (0, catchErrorStack_1.default)(res, 'errors.phoneNumberNull')];
                }
                return [4 /*yield*/, (0, attorneys_db_1.db)('lawyers')
                        .select('first_name', 'last_name', 'email', 'address', 'city_id', 'office_name')
                        .where('id', lawyerId_1)
                        .first()];
            case 1:
                existingLawyer = _b.sent();
                if (!existingLawyer) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.notFound")];
                }
                updateLawyerFields = {};
                if (first_name !== undefined && existingLawyer.first_name !== first_name) {
                    updateLawyerFields.first_name = first_name;
                }
                if (last_name !== undefined && existingLawyer.last_name !== last_name) {
                    updateLawyerFields.last_name = last_name;
                }
                if (office_name !== undefined &&
                    existingLawyer.office_name !== office_name) {
                    updateLawyerFields.office_name = office_name;
                }
                if (email !== undefined && existingLawyer.email !== email) {
                    updateLawyerFields.email = email;
                }
                if (address !== undefined && existingLawyer.address !== address) {
                    updateLawyerFields.address = address;
                }
                if (city_id !== undefined && existingLawyer.city_id !== city_id) {
                    updateLawyerFields.city_id = city_id;
                }
                if (!(phone_numbers !== undefined)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, attorneys_db_1.db)('phone_numbers').where('lawyer_id', lawyerId_1).del()];
            case 2:
                _b.sent();
                if (!(phone_numbers.length > 0)) return [3 /*break*/, 4];
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
                                            lawyer_id: lawyerId_1,
                                        })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                updatedLawyer = [];
                if (Object.keys(updateLawyerFields).length === 0 &&
                    phone_numbers.length === 0) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.nothingChanged")];
                }
                if (!(Object.keys(updateLawyerFields).length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, attorneys_db_1.db)('lawyers')
                        .where('id', lawyerId_1)
                        .update(updateLawyerFields)
                        .returning('id')];
            case 5:
                updatedLawyer = _b.sent();
                _b.label = 6;
            case 6:
                apiResponse = updatedLawyer[0];
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.editLawyerSuccess", apiResponse)];
            case 7:
                error_1 = _b.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.editLawyerService = editLawyerService;
