"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var citiesController_1 = __importDefault(require("../controllers/citiesController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getCitiesList = citiesController_1.default.getCitiesList, getCitiesNames = citiesController_1.default.getCitiesNames, postCity = citiesController_1.default.postCity;
router.get('/cities-list', authenticateToken_1.authenticateToken, getCitiesList);
router.get('/cities-names', authenticateToken_1.authenticateToken, getCitiesNames);
router.post('/cities', authenticateToken_1.authenticateToken, postCity);
exports.default = router;
