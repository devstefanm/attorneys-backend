"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lawyersController_1 = __importDefault(require("../controllers/lawyersController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getLawyersNames = lawyersController_1.default.getLawyersNames, getLawyersList = lawyersController_1.default.getLawyersList, postLawyer = lawyersController_1.default.postLawyer, patchLawyer = lawyersController_1.default.patchLawyer, deleteLawyer = lawyersController_1.default.deleteLawyer, getLawyer = lawyersController_1.default.getLawyer;
router.get('/lawyers-names', authenticateToken_1.authenticateToken, getLawyersNames);
router.get('/lawyers-list', authenticateToken_1.authenticateToken, getLawyersList);
router.get('/lawyer/:lawyerId', authenticateToken_1.authenticateToken, getLawyer);
router.post('/lawyers', authenticateToken_1.authenticateToken, postLawyer);
router.patch('/lawyer/:lawyerId', authenticateToken_1.authenticateToken, patchLawyer);
router.delete('/lawyer/:lawyerId', authenticateToken_1.authenticateToken, deleteLawyer);
exports.default = router;
