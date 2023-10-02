"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authenticateToken = function (req, res, next) {
    var accessToken = req.headers['authorization'];
    if (!accessToken) {
        return res.status(401).json({ message: 'errors.noAccessToken' });
    }
    var token = accessToken.split(' ')[1]; // Remove the 'Bearer ' prefix
    if (!token) {
        return res.status(401).json({ message: 'errors.invalidAccessToken' });
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
        return res.status(500).json({ message: 'errors.accessTokenNotConfigured' });
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'errors.invalidAccessToken' });
        }
        // If the token is valid, you can access the decoded payload
        var payload = decoded;
        // You can also attach the payload to the request object for further processing
        req.payload = payload;
        // Proceed to the next middleware or route handler
        next();
    });
};
exports.authenticateToken = authenticateToken;
