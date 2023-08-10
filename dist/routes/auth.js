"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("../controllers/authController"));
var router = express_1.default.Router();
var login = authController_1.default.login, registration = authController_1.default.registration;
router.post('/login', login);
router.put('/registration/:id', registration);
exports.default = router;
