"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtGenerator = function (jwtPayload) {
    var _a, _b, _c, _d;
    var accessToken = '';
    var refreshToken = '';
    if (process.env.ACCESS_TOKEN_SECRET) {
        accessToken = jsonwebtoken_1.default.sign(jwtPayload, (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.ACCESS_TOKEN_SECRET) === null || _b === void 0 ? void 0 : _b.toString(), { expiresIn: '480m' });
    }
    if (process.env.REFRESH_TOKEN_SECRET) {
        refreshToken = jsonwebtoken_1.default.sign(jwtPayload, (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.REFRESH_TOKEN_SECRET) === null || _d === void 0 ? void 0 : _d.toString(), { expiresIn: '960m' });
    }
    return { accessToken: accessToken, refreshToken: refreshToken };
};
exports.default = jwtGenerator;
