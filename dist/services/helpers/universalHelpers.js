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
exports.getShortNameServiceTemplate = exports.editShortNameServiceTemplate = exports.debtorNameGenerator = exports.jmbgAndPibGenerator = exports.findRecordByNameOrCreateNew = exports.postShortNameServiceTemplate = exports.generateDecimalSearchQuery = exports.generateBigIntSearchQuery = exports.specialCharactersChecker = exports.generateShortNameSearchQuery = exports.generateFullNameSearchQuery = exports.getFullNamesServiceTemplate = exports.getShortNamesServiceTemplate = void 0;
var attorneys_db_1 = require("../../attorneys-db");
var mapApiToResponse_1 = __importDefault(require("../../utils/mapApiToResponse"));
var specialCharacters_1 = __importDefault(require("../../utils/specialCharacters"));
var transformData_1 = require("../../utils/transformData");
var catchErrorStack_1 = __importDefault(require("../../utils/catchErrorStack"));
var getShortNamesServiceTemplate = function (entity) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var search, searchTerm, query, upperCaseEntity, searchTerms, names;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    search = req.query.search;
                    searchTerm = search;
                    query = (0, attorneys_db_1.db)(entity).select('name', 'id');
                    upperCaseEntity = entity.toUpperCase();
                    if (search) {
                        searchTerms = (0, exports.specialCharactersChecker)(searchTerm);
                        (0, exports.generateShortNameSearchQuery)(query, searchTerms);
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
};
exports.getShortNamesServiceTemplate = getShortNamesServiceTemplate;
var getFullNamesServiceTemplate = function (entity) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var search, searchTerm, query, upperCaseEntity, searchTerms, lawyersNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    search = req.query.search;
                    searchTerm = search;
                    query = (0, attorneys_db_1.db)(entity).select('first_name', 'last_name', 'id');
                    upperCaseEntity = entity.toUpperCase();
                    if (search) {
                        searchTerms = (0, exports.specialCharactersChecker)(searchTerm);
                        (0, exports.generateFullNameSearchQuery)(query, searchTerms);
                    }
                    return [4 /*yield*/, query];
                case 1:
                    lawyersNames = _a.sent();
                    if (lawyersNames.length <= 0) {
                        res.status(404);
                        return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "".concat(upperCaseEntity, ".NOT_FOUND"))];
                    }
                    res.status(200);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "".concat(upperCaseEntity, ".SUCCESSFULY_RETRIEVED_NAMES"), lawyersNames)];
            }
        });
    }); };
};
exports.getFullNamesServiceTemplate = getFullNamesServiceTemplate;
var generateFullNameSearchQuery = function (query, searchTerms) {
    query.where(function () {
        var _loop_1 = function (term) {
            if (term.includes(' ')) {
                var _a = term.split(' '), firstName_1 = _a[0], lastName_1 = _a[1];
                this_1.orWhere(function () {
                    this.where(function () {
                        this.whereRaw('LOWER(first_name) = ?', [
                            firstName_1.toLowerCase(),
                        ]).andWhereRaw('LOWER(last_name) LIKE ?', [
                            "%".concat(lastName_1.toLowerCase(), "%"),
                        ]);
                    }).orWhere(function () {
                        this.whereRaw('LOWER(first_name) LIKE ?', [
                            "%".concat(lastName_1.toLowerCase(), "%"),
                        ]).andWhereRaw('LOWER(last_name) = ?', [firstName_1.toLowerCase()]);
                    });
                }).orWhere(function () {
                    this.where(function () {
                        this.whereRaw('LOWER(first_name) LIKE ?', [
                            "%".concat(firstName_1.toLowerCase(), "%"),
                        ]).andWhereRaw('LOWER(last_name) = ?', [lastName_1.toLowerCase()]);
                    }).orWhere(function () {
                        this.whereRaw('LOWER(first_name) LIKE ?', [
                            "%".concat(lastName_1.toLowerCase(), "%"),
                        ]).andWhereRaw('LOWER(last_name) = ?', [firstName_1.toLowerCase()]);
                    });
                });
            }
            else {
                this_1.orWhere(function () {
                    this.whereRaw('LOWER(first_name) LIKE ?', [
                        "%".concat(term.toLowerCase(), "%"),
                    ]).orWhereRaw('LOWER(last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, searchTerms_1 = searchTerms; _i < searchTerms_1.length; _i++) {
            var term = searchTerms_1[_i];
            _loop_1(term);
        }
    });
    return query;
};
exports.generateFullNameSearchQuery = generateFullNameSearchQuery;
var generateShortNameSearchQuery = function (query, searchTerms, name) {
    if (name === void 0) { name = 'name'; }
    query.where(function () {
        var _loop_2 = function (term) {
            this_2.orWhere(function () {
                this.whereRaw("LOWER(".concat(name, ") LIKE ?"), ["%".concat(term.toLowerCase(), "%")]);
            });
        };
        var this_2 = this;
        for (var _i = 0, searchTerms_2 = searchTerms; _i < searchTerms_2.length; _i++) {
            var term = searchTerms_2[_i];
            _loop_2(term);
        }
    });
    return query;
};
exports.generateShortNameSearchQuery = generateShortNameSearchQuery;
var specialCharactersChecker = function (searchTerm) {
    // Create an array to store the search terms
    var searchTerms = [searchTerm];
    // Iterate through the characters in the search term
    for (var i = 0; i < searchTerm.length; i++) {
        var char = searchTerm[i];
        var replacements = specialCharacters_1.default[char.toLowerCase()];
        if (replacements) {
            var modifiedTerms = [];
            for (var _i = 0, searchTerms_3 = searchTerms; _i < searchTerms_3.length; _i++) {
                var term = searchTerms_3[_i];
                for (var _a = 0, replacements_1 = replacements; _a < replacements_1.length; _a++) {
                    var replacement = replacements_1[_a];
                    var modifiedTerm = term.slice(0, i) + replacement + term.slice(i + 1);
                    if (!searchTerms.includes(modifiedTerm)) {
                        modifiedTerms.push(modifiedTerm);
                    }
                }
            }
            searchTerms.push.apply(searchTerms, modifiedTerms);
        }
    }
    return searchTerms;
};
exports.specialCharactersChecker = specialCharactersChecker;
var generateBigIntSearchQuery = function (query, searchBigInt, column) {
    query.where(function () {
        this.orWhereRaw("".concat(column, "::text LIKE ?"), ["%".concat(searchBigInt, "%")]);
    });
    return query;
};
exports.generateBigIntSearchQuery = generateBigIntSearchQuery;
var generateDecimalSearchQuery = function (query, searchValue, column) {
    query.where(function () {
        this.where(column, '=', searchValue);
    });
    return query;
};
exports.generateDecimalSearchQuery = generateDecimalSearchQuery;
var postShortNameServiceTemplate = function (entity) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var name, newEntityId, uppercasedEntity, apiResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.body.name;
                    newEntityId = null;
                    uppercasedEntity = (0, transformData_1.uppercaseFirstLetter)(entity);
                    if (!name) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, attorneys_db_1.db)(entity)
                            .insert({
                            name: name,
                        })
                            .returning('id')];
                case 1:
                    newEntityId = (_a.sent())[0].id;
                    return [3 /*break*/, 3];
                case 2:
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noName")];
                case 3:
                    apiResponse = undefined;
                    if (newEntityId) {
                        apiResponse = {
                            id: newEntityId,
                        };
                        res.status(200);
                        return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.create".concat(uppercasedEntity, "Success"), apiResponse)];
                    }
                    res.status(404);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.notFound", apiResponse)];
            }
        });
    }); };
};
exports.postShortNameServiceTemplate = postShortNameServiceTemplate;
var findRecordByNameOrCreateNew = function (name, entity, nameField) { return __awaiter(void 0, void 0, void 0, function () {
    var existingId;
    var _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, attorneys_db_1.db)(entity).select('id').where(nameField, name).first()];
            case 1:
                existingId = (_b = (_d.sent())) === null || _b === void 0 ? void 0 : _b.id;
                if (!!existingId) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, attorneys_db_1.db)(entity)
                        .insert((_a = {},
                        _a[nameField] = name,
                        _a))
                        .returning('id')];
            case 2: return [2 /*return*/, (_c = (_d.sent())[0]) === null || _c === void 0 ? void 0 : _c.id];
            case 3: return [2 /*return*/, existingId];
        }
    });
}); };
exports.findRecordByNameOrCreateNew = findRecordByNameOrCreateNew;
var jmbgAndPibGenerator = function (singleCase) {
    var transformedCase = {};
    if (singleCase.is_legal) {
        transformedCase = __assign(__assign({}, singleCase), { pib: singleCase.jmbg_pib });
    }
    else {
        transformedCase = __assign(__assign({}, singleCase), { jmbg: singleCase.jmbg_pib });
    }
    delete transformedCase.jmbg_pib;
    return transformedCase;
};
exports.jmbgAndPibGenerator = jmbgAndPibGenerator;
var debtorNameGenerator = function (singleCase) {
    var transformedCase = {};
    var name = singleCase.name;
    if (!singleCase.is_legal) {
        var words = name.split(' ');
        var firstName = words.shift();
        var lastName = words.join(' ');
        transformedCase = __assign(__assign({}, singleCase), { first_name: firstName, last_name: lastName });
        delete transformedCase.name;
        return transformedCase;
    }
    return singleCase;
};
exports.debtorNameGenerator = debtorNameGenerator;
var editShortNameServiceTemplate = function (entity, id) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var name, uppercasedEntity, existingRecord, apiResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = req.body.name;
                    uppercasedEntity = (0, transformData_1.uppercaseFirstLetter)(entity);
                    if (name === null || name === '') {
                        res.status(400);
                        return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.noName")];
                    }
                    if (name === undefined) {
                        res.status(400);
                        return [2 /*return*/, (0, mapApiToResponse_1.default)(400, "errors.nothingChanged")];
                    }
                    return [4 /*yield*/, (0, attorneys_db_1.db)(entity)
                            .select('name')
                            .where('id', id)
                            .first()];
                case 1:
                    existingRecord = _a.sent();
                    if (!existingRecord) {
                        res.status(404);
                        return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.notFound")];
                    }
                    if (!(name && existingRecord.name !== name)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, attorneys_db_1.db)(entity).where('id', id).update({ name: name }).returning('id')];
                case 2:
                    apiResponse = (_a.sent())[0];
                    res.status(200);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.edit".concat(uppercasedEntity, "Success"), apiResponse)];
                case 3: return [2 /*return*/, (0, catchErrorStack_1.default)(res, "errors.serverError")];
            }
        });
    }); };
};
exports.editShortNameServiceTemplate = editShortNameServiceTemplate;
var getShortNameServiceTemplate = function (entity, id) {
    return function (res) { return __awaiter(void 0, void 0, void 0, function () {
        var uppercasedEntity, chosenEntity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uppercasedEntity = (0, transformData_1.uppercaseFirstLetter)(entity);
                    return [4 /*yield*/, (0, attorneys_db_1.db)(entity)
                            .select('id', 'name')
                            .where('id', id)
                            .first()];
                case 1:
                    chosenEntity = _a.sent();
                    if (!chosenEntity) {
                        res.status(404);
                        return [2 /*return*/, (0, mapApiToResponse_1.default)(404, "errors.notFound")];
                    }
                    res.status(200);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(200, "messages.retrieve".concat(uppercasedEntity, "Success"), chosenEntity)];
            }
        });
    }); };
};
exports.getShortNameServiceTemplate = getShortNameServiceTemplate;
