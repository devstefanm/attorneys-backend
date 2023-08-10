"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapApiToResponse = function (statusCode, message, data) {
    if (statusCode === void 0) { statusCode = 200; }
    if (statusCode >= 200 && statusCode < 300) {
        return { data: data, message: message };
    }
    else {
        return { error: statusCode, message: message };
    }
};
exports.default = mapApiToResponse;
