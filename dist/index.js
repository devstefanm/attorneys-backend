"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var auth_1 = __importDefault(require("./routes/auth"));
var lawyers_1 = __importDefault(require("./routes/lawyers"));
var clients_1 = __importDefault(require("./routes/clients"));
var courts_1 = __importDefault(require("./routes/courts"));
var executors_1 = __importDefault(require("./routes/executors"));
var employers_1 = __importDefault(require("./routes/employers"));
var cases_1 = __importDefault(require("./routes/cases"));
var transactions_1 = __importDefault(require("./routes/transactions"));
var packages_1 = __importDefault(require("./routes/packages"));
var ssnNumbers_1 = __importDefault(require("./routes/ssnNumbers"));
var cities_1 = __importDefault(require("./routes/cities"));
var PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
var corsOptions = { credentials: true, origin: '*' };
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/auth', auth_1.default);
app.use('/api', [
    cases_1.default,
    cities_1.default,
    clients_1.default,
    courts_1.default,
    employers_1.default,
    executors_1.default,
    lawyers_1.default,
    packages_1.default,
    ssnNumbers_1.default,
    transactions_1.default,
]);
app.listen(PORT, function () {
    console.log("Server has started on port ".concat(PORT));
    // runMigrations();
});
