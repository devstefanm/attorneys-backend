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
exports.getPackagesNamesServiceTemplate = exports.generatePackagesNameSearchQuery = exports.buildPackagesNameSearchConditions = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var universalHelpers_1 = require("./universalHelpers");
var buildPackagesNameSearchConditions = function (builder, term) {
    builder.orWhere(function () {
        this.whereRaw('LOWER(pck.package_name) LIKE ?', [
            "%".concat(term.toLowerCase(), "%"),
        ]);
    });
};
exports.buildPackagesNameSearchConditions = buildPackagesNameSearchConditions;
var generatePackagesNameSearchQuery = function (query, searchTerms) {
    query.where(function () {
        var _loop_1 = function (term) {
            this_1.orWhere(function () {
                this.whereRaw('LOWER(package_name) LIKE ?', [
                    "%".concat(term.toLowerCase(), "%"),
                ]);
            });
        };
        var this_1 = this;
        for (var _i = 0, searchTerms_1 = searchTerms; _i < searchTerms_1.length; _i++) {
            var term = searchTerms_1[_i];
            _loop_1(term);
        }
    });
    return query;
};
exports.generatePackagesNameSearchQuery = generatePackagesNameSearchQuery;
var getPackagesNamesServiceTemplate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, searchTerm, query, upperCaseEntity, searchTerms, names;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search = req.query.search;
                searchTerm = search;
                query = (0, attorneys_db_1.db)('packages').select('package_name', 'id');
                upperCaseEntity = 'packages'.toUpperCase();
                if (search) {
                    searchTerms = (0, universalHelpers_1.specialCharactersChecker)(searchTerm);
                    (0, exports.generatePackagesNameSearchQuery)(query, searchTerms);
                }
                return [4 /*yield*/, query];
            case 1:
                names = _a.sent();
                if (names.length <= 0) {
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "".concat(upperCaseEntity, ".NOT_FOUND"))];
                }
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "".concat(upperCaseEntity, ".SUCCESSFULY_RETRIEVED_NAMES"), names)];
        }
    });
}); };
exports.getPackagesNamesServiceTemplate = getPackagesNamesServiceTemplate;
