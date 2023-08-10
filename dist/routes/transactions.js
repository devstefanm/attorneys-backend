"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transactionsController_1 = __importDefault(require("../controllers/transactionsController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getTransactionsList = transactionsController_1.default.getTransactionsList;
router.get('/transactions-list', authenticateToken_1.authenticateToken, getTransactionsList);
exports.default = router;
