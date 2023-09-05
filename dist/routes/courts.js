"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var courtsController_1 = __importDefault(require("../controllers/courtsController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getCourtsNames = courtsController_1.default.getCourtsNames, getCourtsList = courtsController_1.default.getCourtsList, postCourt = courtsController_1.default.postCourt;
router.get('/courts-names', authenticateToken_1.authenticateToken, getCourtsNames);
router.get('/courts-list', authenticateToken_1.authenticateToken, getCourtsList);
router.post('/courts', authenticateToken_1.authenticateToken, postCourt);
exports.default = router;
