"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clientsController_1 = __importDefault(require("../controllers/clientsController"));
var express_1 = __importDefault(require("express"));
var authenticateToken_1 = require("../middlewares/schemas/authenticateToken");
var router = express_1.default.Router();
var getClientsNames = clientsController_1.default.getClientsNames, getClientsList = clientsController_1.default.getClientsList;
router.get('/clients-names', authenticateToken_1.authenticateToken, getClientsNames);
router.get('/clients-list', authenticateToken_1.authenticateToken, getClientsList);
exports.default = router;
