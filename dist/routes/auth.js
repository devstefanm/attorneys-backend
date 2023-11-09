"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("../controllers/authController"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var login = authController_1.default.login, changePassword = authController_1.default.changePassword;
router.post('/login', login);
router.put('/change-password/:userId', authenticateToken_1.authenticateToken, changePassword);
exports.default = router;
