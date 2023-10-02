"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var citiesController_1 = __importDefault(require("../controllers/citiesController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getCitiesList = citiesController_1.default.getCitiesList, getCitiesNames = citiesController_1.default.getCitiesNames, postCity = citiesController_1.default.postCity, patchCity = citiesController_1.default.patchCity, deleteCity = citiesController_1.default.deleteCity, getCity = citiesController_1.default.getCity;
router.get('/cities-list', authenticateToken_1.authenticateToken, getCitiesList);
router.get('/cities-names', authenticateToken_1.authenticateToken, getCitiesNames);
router.get('/city/:cityId', authenticateToken_1.authenticateToken, getCity);
router.post('/cities', authenticateToken_1.authenticateToken, postCity);
router.patch('/city/:cityId', authenticateToken_1.authenticateToken, patchCity);
router.delete('/city/:cityId', authenticateToken_1.authenticateToken, deleteCity);
exports.default = router;
