"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var employersController_1 = __importDefault(require("../controllers/employersController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getEmployersNames = employersController_1.default.getEmployersNames;
router.get('/employers/names', authenticateToken_1.authenticateToken, getEmployersNames);
exports.default = router;
