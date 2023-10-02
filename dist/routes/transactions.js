"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transactionsController_1 = __importDefault(require("../controllers/transactionsController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
var router = express_1.default.Router();
var getTransactionsList = transactionsController_1.default.getTransactionsList, postTransaction = transactionsController_1.default.postTransaction, patchTransaction = transactionsController_1.default.patchTransaction, deleteTransaction = transactionsController_1.default.deleteTransaction, getTransaction = transactionsController_1.default.getTransaction, importTransactionsList = transactionsController_1.default.importTransactionsList;
router.get('/transactions-list', authenticateToken_1.authenticateToken, getTransactionsList);
router.get('/transaction/:transactionId', authenticateToken_1.authenticateToken, getTransaction);
router.post('/transactions', authenticateToken_1.authenticateToken, postTransaction);
router.post('/import-transactions-list', authenticateToken_1.authenticateToken, uploadMiddleware_1.default.single('file'), importTransactionsList);
router.patch('/transaction/:transactionId', authenticateToken_1.authenticateToken, patchTransaction);
router.delete('/transaction/:transactionId', authenticateToken_1.authenticateToken, deleteTransaction);
exports.default = router;
