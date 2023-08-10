"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mapApiToResponse_1 = __importDefault(require("./mapApiToResponse"));
var catchErrorStack = function (res, error) {
    console.error(error);
    res.status(500);
    return (0, mapApiToResponse_1.default)(500, error.message || 'ERROR.SERVER', undefined);
};
exports.default = catchErrorStack;
