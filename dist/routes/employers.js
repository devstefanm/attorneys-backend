"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var employersController_1 = __importDefault(require("../controllers/employersController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getEmployersNames = employersController_1.default.getEmployersNames, getEmployersList = employersController_1.default.getEmployersList, postEmployer = employersController_1.default.postEmployer, patchEmployer = employersController_1.default.patchEmployer, deleteEmployer = employersController_1.default.deleteEmployer, getEmployer = employersController_1.default.getEmployer;
router.get('/employers-names', authenticateToken_1.authenticateToken, getEmployersNames);
router.get('/employers-list', authenticateToken_1.authenticateToken, getEmployersList);
router.get('/employer/:employerId', authenticateToken_1.authenticateToken, getEmployer);
router.post('/employers', authenticateToken_1.authenticateToken, postEmployer);
router.patch('/employer/:employerId', authenticateToken_1.authenticateToken, patchEmployer);
router.delete('/employer/:employerId', authenticateToken_1.authenticateToken, deleteEmployer);
exports.default = router;
