"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lawyersController_1 = __importDefault(require("../controllers/lawyersController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getLawyersNames = lawyersController_1.default.getLawyersNames;
router.get('/lawyers/names', authenticateToken_1.authenticateToken, getLawyersNames);
exports.default = router;
