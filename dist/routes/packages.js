"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var packagesController_1 = __importDefault(require("../controllers/packagesController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getPackagesList = packagesController_1.default.getPackagesList, getPackagesNames = packagesController_1.default.getPackagesNames, postPackage = packagesController_1.default.postPackage;
router.get('/packages-list', authenticateToken_1.authenticateToken, getPackagesList);
router.get('/packages-names', authenticateToken_1.authenticateToken, getPackagesNames);
router.post('/packages', authenticateToken_1.authenticateToken, postPackage);
exports.default = router;
