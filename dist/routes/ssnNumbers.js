"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ssnController_1 = __importDefault(require("../controllers/ssnController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getSSNList = ssnController_1.default.getSSNList, getSSNNumbers = ssnController_1.default.getSSNNumbers, postSSNNumber = ssnController_1.default.postSSNNumber;
router.get('/ssn-list', authenticateToken_1.authenticateToken, getSSNList);
router.get('/ssn-numbers', authenticateToken_1.authenticateToken, getSSNNumbers);
router.post('/ssn', authenticateToken_1.authenticateToken, postSSNNumber);
exports.default = router;
