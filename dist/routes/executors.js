"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var executorsController_1 = __importDefault(require("../controllers/executorsController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getExecutorsNames = executorsController_1.default.getExecutorsNames, getExecutorsList = executorsController_1.default.getExecutorsList, postExecutor = executorsController_1.default.postExecutor;
router.get('/executors-names', authenticateToken_1.authenticateToken, getExecutorsNames);
router.get('/executors-list', authenticateToken_1.authenticateToken, getExecutorsList);
router.post('/executors', authenticateToken_1.authenticateToken, postExecutor);
exports.default = router;
