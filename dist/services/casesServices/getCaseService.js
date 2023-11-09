"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getCaseService = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var casesHelpers_1 = require("../helpers/casesHelpers");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var getCaseService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var caseId, caseQuery, chosenCase, caseTransactions, sumOfTransactions, apiResponse, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                caseId = req.params.caseId;
                caseQuery = (0, attorneys_db_1.db)('cases as c')
                    .select('c.id', 'c.case_number', 'c.contract_number', 'c.closing_date', 'c.state', 'c.principal', 'c.interest', 'c.old_payment', 'c.our_taxes', 'c.warning_price', 'c.entering_date', 'c.lawyer_hand_over_date', 'c.comment', 'c.limitation_objection', 'c.case_category', 'c.opposing_party_expense', 'd.is_legal', 'd.cession', 'd.address', 'd.email', 'd.zip_code', 'p.first_name', 'p.last_name', 'p.jmbg', 'p.employed', 'o.name', 'o.pib', 'st.name as status', attorneys_db_1.db.raw("CASE WHEN COUNT(l.id) = 0 THEN null ELSE json_build_object('id', l.id, 'office_name', l.office_name, 'first_name', l.first_name, 'last_name', l.last_name) END as lawyer"), attorneys_db_1.db.raw("CASE WHEN COUNT(s.id) = 0 THEN null ELSE json_build_object('id', s.id, 'ssn', s.ssn) END as ssn_number"), attorneys_db_1.db.raw("CASE WHEN COUNT(pck.id) = 0 THEN null ELSE json_build_object('id', pck.id, 'package_name', pck.package_name) END as package"), attorneys_db_1.db.raw("CASE WHEN COUNT(cl.id) = 0 THEN null ELSE json_build_object('id', cl.id, 'name', cl.name) END as client"), attorneys_db_1.db.raw("CASE WHEN COUNT(co.id) = 0 THEN null ELSE json_build_object('id', co.id, 'name', co.name) END as court"), attorneys_db_1.db.raw("CASE WHEN COUNT(ci.id) = 0 THEN null ELSE json_build_object('id', ci.id, 'name', ci.name) END as city"), attorneys_db_1.db.raw("CASE WHEN COUNT(emp.id) = 0 THEN null ELSE json_build_object('id', emp.id, 'name', emp.name) END as employer"), attorneys_db_1.db.raw("CASE WHEN COUNT(e.id) = 0 THEN null ELSE json_agg(distinct jsonb_build_object('id', e.id, 'first_name', e.first_name, 'last_name', e.last_name)) END as executors"), attorneys_db_1.db.raw("CASE WHEN COUNT(bn.id) = 0 THEN null ELSE json_agg(distinct jsonb_build_object('id', bn.id, 'number', bn.number)) END as business_numbers"), attorneys_db_1.db.raw('CASE WHEN COUNT(pn.number) = 0 THEN null ELSE json_agg(distinct pn.number) END as phone_numbers'))
                    .where('c.id', caseId)
                    .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
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
                    .leftJoin('phone_numbers as pn', 'd.id', 'pn.debtor_id')
                    .groupBy('c.id', 'c.case_number', 'c.contract_number', 'c.closing_date', 'c.state', 'c.principal', 'c.interest', 'c.old_payment', 'c.our_taxes', 'c.warning_price', 'c.entering_date', 'c.lawyer_hand_over_date', 'c.comment', 'c.limitation_objection', 'c.case_category', 'c.opposing_party_expense', 'd.is_legal', 'd.cession', 'd.address', 'd.email', 'd.zip_code', 'p.first_name', 'p.last_name', 'p.jmbg', 'p.employed', 'o.name', 'o.pib', 'l.id', 'l.office_name', 'l.first_name', 'l.last_name', 's.id', 's.ssn', 'pck.id', 'pck.package_name', 'st.name', 'cl.id', 'cl.name', 'co.id', 'co.name', 'ci.id', 'ci.name', 'emp.id')
                    .first();
                return [4 /*yield*/, caseQuery];
            case 1:
                chosenCase = _a.sent();
                if (!chosenCase) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.caseNotFound")];
                }
                return [4 /*yield*/, (0, attorneys_db_1.db)('transactions')
                        .select('amount', 'type')
                        .where('case_id', caseId)];
            case 2:
                caseTransactions = _a.sent();
                sumOfTransactions = (0, casesHelpers_1.calculateTypeSums)(caseTransactions);
                apiResponse = __assign(__assign({}, chosenCase), sumOfTransactions);
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.retrieveCaseSuccess", apiResponse)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCaseService = getCaseService;
