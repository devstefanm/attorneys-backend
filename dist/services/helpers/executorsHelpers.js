"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExecutorsNameSearchConditions = void 0;
var buildExecutorsNameSearchConditions = function (builder, term) {
    if (term.includes(' ')) {
        var _a = term.split(' '), firstName_1 = _a[0], lastName_1 = _a[1];
        builder
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(e.first_name) = ?', [
                    firstName_1.toLowerCase(),
                ]).andWhereRaw('LOWER(e.last_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]);
            }).orWhere(function () {
                this.whereRaw('LOWER(e.first_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(e.last_name) = ?', [firstName_1.toLowerCase()]);
            });
        })
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(e.first_name) LIKE ?', [
                    "%".concat(firstName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(e.last_name) = ?', [lastName_1.toLowerCase()]);
            }).orWhere(function () {
                this.whereRaw('LOWER(e.first_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(e.last_name) = ?', [firstName_1.toLowerCase()]);
            });
        });
    }
    else {
        builder.orWhere(function () {
            this.whereRaw('LOWER(e.first_name) LIKE ?', [
                "%".concat(term.toLowerCase(), "%"),
            ]).orWhereRaw('LOWER(e.last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
        });
    }
};
exports.buildExecutorsNameSearchConditions = buildExecutorsNameSearchConditions;
