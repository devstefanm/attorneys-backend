"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var casesController_1 = __importDefault(require("../controllers/casesController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getCasesList = casesController_1.default.getCasesList;
router.get('/cases-list', authenticateToken_1.authenticateToken, getCasesList);
exports.default = router;