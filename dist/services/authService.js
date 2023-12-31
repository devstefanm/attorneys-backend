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
exports.changePasswordService = exports.loginService = void 0;
var attorneys_db_1 = require("../attorneys-db");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var authSchemas_1 = require("../middlewares/schemas/authSchemas");
var catchErrorStack_1 = __importDefault(require("../utils/catchErrorStack"));
var jwtGenerator_1 = __importDefault(require("../utils/jwtGenerator"));
var mapApiToResponse_1 = __importDefault(require("../utils/mapApiToResponse"));
var loginService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, password, validator, user, validPassword, id, email, username, role_name, tokens, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, identifier = _a.identifier, password = _a.password;
                validator = authSchemas_1.loginSchema.validate(req.body);
                if (validator.error) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, validator.error.message)];
                }
                return [4 /*yield*/, (0, attorneys_db_1.db)('users as u')
                        .select('u.id', 'u.username', 'u.email', 'u.password', 'r.name as role_name')
                        .join('roles as r', 'u.role', 'r.id')
                        .where('username', identifier)
                        .orWhere('email', identifier)
                        .first()];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(401);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(401, 'errors.wrongEmailOrUsername')];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                validPassword = _b.sent();
                if (!validPassword) {
                    res.status(401);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(401, 'errors.wrongPassword')];
                }
                id = user.id, email = user.email, username = user.username, role_name = user.role_name;
                tokens = (0, jwtGenerator_1.default)({ id: id, email: email, username: username, role_name: role_name });
                res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
                res.status(200);
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, 'LOGIN.SUCCESS', tokens)];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginService = loginService;
var changePasswordService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, newPassword, passwordRegex, hashedNewPassword, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                userId = req.params.userId;
                newPassword = req.body.newPassword;
                // Check if the new password is at least 6 characters long
                if (newPassword.length < 6) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, 'errors.newPasswordTooShort')];
                }
                passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
                if (!passwordRegex.test(newPassword)) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, 'errors.passwordComplexity')];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 10)];
            case 1:
                hashedNewPassword = _a.sent();
                return [4 /*yield*/, (0, attorneys_db_1.db)('users')
                        .select('password')
                        .where('id', userId)
                        .first()];
            case 2:
                user = _a.sent();
                if (!user) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, 'USER_NOT_FOUND')];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(newPassword, user.password)];
            case 3:
                // Compare the new password with the old password
                if (_a.sent()) {
                    res.status(400);
                    return [2 /*return*/, (0, mapApiToResponse_1.default)(400, 'errors.newPasswordSameAsOld')];
                }
                // Update the user's password
                return [4 /*yield*/, (0, attorneys_db_1.db)('users')
                        .where('id', userId)
                        .update({ password: hashedNewPassword })];
            case 4:
                // Update the user's password
                _a.sent();
                return [2 /*return*/, (0, mapApiToResponse_1.default)(200, 'messages.passwordChanged')];
            case 5:
                error_2 = _a.sent();
                return [2 /*return*/, (0, catchErrorStack_1.default)(res, error_2)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.changePasswordService = changePasswordService;
