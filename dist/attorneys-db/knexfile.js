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
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "../../.env.".concat(process.env.NODE_ENV) });
var config = {
    development: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
        },
        pool: {
            max: Number(process.env.DB_POOL_SIZE) || 2,
            idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT) || 10000,
        },
        migrations: {
            directory: './attorneys-db/migrations/initial',
            tableName: 'knex_migrations',
        },
    },
    production: {
        client: 'postgresql',
        connection: {
            database: process.env.DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            ssl: {
                rejectUnauthorized: false,
            },
        },
        pool: {
            max: Number(process.env.DB_POOL_SIZE),
            idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
        },
        migrations: {
            directory: './dist/attorneys-db/migrations/initial',
            tableName: 'knex_migrations',
        },
    },
};
exports.default = config;
