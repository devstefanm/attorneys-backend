"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var packagesController_1 = __importDefault(require("../controllers/packagesController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getPackagesList = packagesController_1.default.getPackagesList;
router.get('/packages-list', authenticateToken_1.authenticateToken, getPackagesList);
exports.default = router;
