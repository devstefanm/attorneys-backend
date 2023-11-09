"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.createTable('roles', function (table) {
                        table.increments('id').primary();
                        table.string('name').notNullable();
                        table.string('display_name');
                        table.timestamps(true, true);
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('users', function (table) {
                            table.increments('id').primary();
                            table.string('first_name').nullable();
                            table.string('last_name').nullable();
                            table.string('username').notNullable().unique();
                            table.string('email').notNullable().unique();
                            table.string('password').notNullable();
                            table
                                .integer('role')
                                .unsigned()
                                .notNullable()
                                .references('id')
                                .inTable('roles');
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('business_numbers', function (table) {
                            table.increments('id').primary();
                            table.string('number').notNullable();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('cities', function (table) {
                            table.increments('id').primary();
                            table.string('name').notNullable();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('clients', function (table) {
                            table.increments('id').primary();
                            table.string('name').notNullable().unique();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('courts', function (table) {
                            table.increments('id').primary();
                            table.string('name').notNullable().unique();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('employers', function (table) {
                            table.increments('id').primary();
                            table.string('name').notNullable();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('excerpts', function (table) {
                            table.increments('id').primary();
                            table.integer('excerpt_number').notNullable();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('files', function (table) {
                            table.increments('id').primary();
                            table.string('filename').notNullable();
                            table.string('path').notNullable();
                            table.string('mime_type').notNullable();
                            table.integer('size').unsigned().notNullable();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('packages', function (table) {
                            table.increments('id').primary();
                            table.string('package_name').notNullable().unique();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('ssn_numbers', function (table) {
                            table.increments('id').primary();
                            table.bigInteger('ssn').notNullable().unique();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('lawyers', function (table) {
                            table.increments('id').primary();
                            table.string('office_name').nullable();
                            table.string('first_name').nullable();
                            table.string('last_name').nullable();
                            table.string('email').nullable();
                            table.string('address').nullable();
                            table.integer('city_id').unsigned().nullable();
                            table.foreign('city_id').references('cities.id').onDelete('SET NULL');
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('executors', function (table) {
                            table.increments('id').primary();
                            table.string('first_name').notNullable();
                            table.string('last_name').notNullable();
                            table.string('email').notNullable().unique();
                            table.string('address').nullable();
                            table.integer('city_id').unsigned().nullable();
                            table.foreign('city_id').references('cities.id').onDelete('SET NULL');
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('people', function (table) {
                            table.increments('id').primary();
                            table.string('first_name').notNullable();
                            table.string('last_name').notNullable();
                            table.bigInteger('jmbg').notNullable();
                            table.boolean('employed').defaultTo(false).notNullable();
                            table.integer('employer_id').unsigned().nullable();
                            table
                                .foreign('employer_id')
                                .references('employers.id')
                                .onDelete('SET NULL');
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('organizations', function (table) {
                            table.increments('id').primary();
                            table.string('name').notNullable();
                            table.bigInteger('pib').nullable();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('debtors', function (table) {
                            table.increments('id').primary();
                            table.string('type').notNullable();
                            table.boolean('is_legal').notNullable();
                            table.boolean('cession').notNullable();
                            table.string('address').nullable();
                            table.string('email').nullable();
                            table.string('zip_code', 5).nullable();
                            table.integer('entity_id').unsigned().notNullable();
                            table.integer('person_id').unsigned().nullable();
                            table.foreign('person_id').references('people.id').onDelete('SET NULL');
                            table.integer('organization_id').unsigned().nullable();
                            table
                                .foreign('organization_id')
                                .references('organizations.id')
                                .onDelete('SET NULL');
                            table.integer('city_id').unsigned().nullable();
                            table.foreign('city_id').references('cities.id').onDelete('SET NULL');
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('phone_numbers', function (table) {
                            table.increments('id').primary();
                            table.string('number').notNullable();
                            table.string('display_number').nullable();
                            table.integer('debtor_id').unsigned().nullable();
                            table.foreign('debtor_id').references('debtors.id').onDelete('CASCADE');
                            table.integer('lawyer_id').unsigned().nullable();
                            table.foreign('lawyer_id').references('lawyers.id').onDelete('CASCADE');
                            table.integer('executor_id').unsigned().nullable();
                            table.foreign('executor_id').references('executors.id').onDelete('CASCADE');
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('cases', function (table) {
                            table.increments('id').primary();
                            table.bigInteger('case_number').notNullable();
                            table.bigInteger('contract_number').notNullable();
                            table
                                .enu('status', ['active', 'closed'], {
                                useNative: true,
                                enumName: 'case_status',
                            })
                                .notNullable()
                                .defaultTo('active');
                            table.dateTime('closing_date').nullable();
                            table.string('business_number').nullable();
                            table.integer('debtor_id').unsigned().notNullable();
                            table.foreign('debtor_id').references('debtors.id').onDelete('CASCADE');
                            table.integer('lawyer_id').unsigned().nullable();
                            table.foreign('lawyer_id').references('lawyers.id').onDelete('SET NULL');
                            table.integer('client_id').unsigned().notNullable();
                            table.foreign('client_id').references('clients.id').onDelete('CASCADE');
                            table.integer('court_id').unsigned().nullable();
                            table.foreign('court_id').references('courts.id').onDelete('SET NULL');
                            table.integer('ssn_number_id').unsigned().nullable();
                            table
                                .foreign('ssn_number_id')
                                .references('ssn_numbers.id')
                                .onDelete('SET NULL');
                            table.integer('package_id').unsigned().nullable();
                            table.foreign('package_id').references('packages.id').onDelete('SET NULL');
                            table.decimal('principal', 16, 2).notNullable();
                            table.decimal('interest', 16, 2).notNullable();
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('transactions', function (table) {
                            table.increments('id').primary();
                            table
                                .enum('type', ['payment', 'fee', 'legal_fee'], {
                                useNative: true,
                                enumName: 'transaction_type',
                            })
                                .notNullable();
                            table.decimal('amount', 16, 2).notNullable();
                            table.string('posting_method', 5).nullable();
                            table.timestamp('payment_date').defaultTo(knex.fn.now()).notNullable();
                            table.integer('case_id').unsigned().notNullable();
                            table.foreign('case_id').references('cases.id').onDelete('CASCADE');
                            table.integer('excerpt_id').unsigned().nullable();
                            table.foreign('excerpt_id').references('excerpts.id').onDelete('SET NULL');
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('case_executors', function (table) {
                            table.integer('case_id').unsigned().notNullable();
                            table.foreign('case_id').references('cases.id').onDelete('CASCADE');
                            table.integer('executor_id').unsigned().notNullable();
                            table.foreign('executor_id').references('executors.id').onDelete('CASCADE');
                            table.primary(['case_id', 'executor_id']);
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('case_business_numbers', function (table) {
                            table.integer('case_id').unsigned().notNullable();
                            table.foreign('case_id').references('cases.id').onDelete('CASCADE');
                            table.integer('business_number_id').unsigned().notNullable();
                            table
                                .foreign('business_number_id')
                                .references('business_numbers.id')
                                .onDelete('CASCADE');
                            table.primary(['case_id', 'business_number_id']);
                            table.integer('created_by').unsigned().references('id').inTable('users');
                            table.integer('updated_by').unsigned().references('id').inTable('users');
                            table.timestamps(true, true);
                        })];
                case 21:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.dropTableIfExists('roles')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('users')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('business_numbers')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('cities')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('clients')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('courts')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('employers')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('excerpts')];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('files')];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('packages')];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('ssn_numbers')];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('lawyers')];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('executors')];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('people')];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('organizations')];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('debtors')];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('phone_numbers')];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('cases')];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('transactions')];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('case_executors')];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('case_business_numbers')];
                case 21:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.down = down;
