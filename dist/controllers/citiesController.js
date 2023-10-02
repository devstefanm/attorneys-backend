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
Object.defineProperty(exports, "__esModule", { value: true });
var createCityService_1 = require("../services/citiesServices/createCityService");
var deleteCityService_1 = require("../services/citiesServices/deleteCityService");
var editCityService_1 = require("../services/citiesServices/editCityService");
var getCitiesListService_1 = require("../services/citiesServices/getCitiesListService");
var getCitiesNamesService_1 = require("../services/citiesServices/getCitiesNamesService");
var getCityService_1 = require("../services/citiesServices/getCityService");
var cities = {
    getCitiesList: function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = res).json;
                    return [4 /*yield*/, (0, getCitiesListService_1.getCitiesListService)(req, res)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    console.error({ error: error_1.message });
                    res.json({ error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getCitiesNames: function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = res).json;
                    return [4 /*yield*/, (0, getCitiesNamesService_1.getCitiesNamesService)(req, res)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _c.sent();
                    console.error({ error: error_2.message });
                    res.json({ error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getCity: function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = res).json;
                    return [4 /*yield*/, (0, getCityService_1.getCityService)(req, res)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    console.error({ error: error_3.message });
                    res.json({ error: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    postCity: function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, error_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = res).json;
                    return [4 /*yield*/, (0, createCityService_1.createCityService)(req, res)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _c.sent();
                    console.error({ error: error_4.message });
                    res.json({ error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    patchCity: function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, error_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = res).json;
                    return [4 /*yield*/, (0, editCityService_1.editCityService)(req, res)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _c.sent();
                    console.error({ error: error_5.message });
                    res.json({ error: error_5.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    deleteCity: function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, error_6;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = res).json;
                    return [4 /*yield*/, (0, deleteCityService_1.deleteCityService)(req, res)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _c.sent();
                    console.error({ error: error_6.message });
                    res.json({ error: error_6.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = cities;
