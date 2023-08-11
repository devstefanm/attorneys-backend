"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLawyersOfficeNameSearchConditions = exports.buildLawyersNameSearchConditions = void 0;
var buildLawyersNameSearchConditions = function (builder, term) {
    if (term.includes(' ')) {
        var _a = term.split(' '), firstName_1 = _a[0], lastName_1 = _a[1];
        builder
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(l.first_name) = ?', [
                    firstName_1.toLowerCase(),
                ]).andWhereRaw('LOWER(l.last_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]);
            }).orWhere(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName_1.toLowerCase()]);
            });
        })
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(firstName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [lastName_1.toLowerCase()]);
            }).orWhere(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName_1.toLowerCase()]);
            });
        });
    }
    else {
        builder.orWhere(function () {
            this.whereRaw('LOWER(l.first_name) LIKE ?', [
                "%".concat(term.toLowerCase(), "%"),
            ]).orWhereRaw('LOWER(l.last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
        });
    }
};
exports.buildLawyersNameSearchConditions = buildLawyersNameSearchConditions;
var buildLawyersOfficeNameSearchConditions = function (builder, term) {
    builder.orWhere(function () {
        this.whereRaw('LOWER(l.office_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    });
};
exports.buildLawyersOfficeNameSearchConditions = buildLawyersOfficeNameSearchConditions;
