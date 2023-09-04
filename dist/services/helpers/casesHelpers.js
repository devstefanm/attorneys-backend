"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPeopleNameSearchConditions = exports.identifySearchedString = exports.generateJmbgAndPibSearchQuery = exports.buildLawyerNameSearchConditions = exports.buildCasesNameSearchConditions = void 0;
var buildCasesNameSearchConditions = function (builder, term) {
    if (term.includes(' ')) {
        var _a = term.split(' '), firstName_1 = _a[0], lastName_1 = _a[1];
        builder
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(p.first_name) = ?', [
                    firstName_1.toLowerCase(),
                ]).andWhereRaw('LOWER(p.last_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]);
            }).orWhere(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName_1.toLowerCase()]);
            });
        })
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(firstName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [lastName_1.toLowerCase()]);
            }).orWhere(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName_1.toLowerCase()]);
            });
        })
            .orWhereRaw('LOWER(o.name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    }
    else {
        builder.orWhere(function () {
            this.whereRaw('LOWER(p.first_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")])
                .orWhereRaw('LOWER(p.last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")])
                .orWhereRaw('LOWER(o.name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
        });
    }
};
exports.buildCasesNameSearchConditions = buildCasesNameSearchConditions;
var buildLawyerNameSearchConditions = function (builder, term) {
    if (term.includes(' ')) {
        var _a = term.split(' '), firstName_2 = _a[0], lastName_2 = _a[1];
        builder
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(l.first_name) = ?', [
                    firstName_2.toLowerCase(),
                ]).andWhereRaw('LOWER(l.last_name) LIKE ?', [
                    "%".concat(lastName_2.toLowerCase(), "%"),
                ]);
            }).orWhere(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(lastName_2.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName_2.toLowerCase()]);
            });
        })
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(firstName_2.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [lastName_2.toLowerCase()]);
            }).orWhere(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(lastName_2.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName_2.toLowerCase()]);
            });
        })
            .orWhereRaw('LOWER(l.office_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    }
    else {
        builder.orWhere(function () {
            this.whereRaw('LOWER(l.first_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")])
                .orWhereRaw('LOWER(l.last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")])
                .orWhereRaw('LOWER(l.office_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
        });
    }
};
exports.buildLawyerNameSearchConditions = buildLawyerNameSearchConditions;
var generateJmbgAndPibSearchQuery = function (query, searchNumber) {
    query.where(function () {
        this.orWhereRaw('p.jmbg::text LIKE ?', ["%".concat(searchNumber, "%")]).orWhereRaw('o.pib::text LIKE ?', ["%".concat(searchNumber, "%")]);
    });
    return query;
};
exports.generateJmbgAndPibSearchQuery = generateJmbgAndPibSearchQuery;
var identifySearchedString = function (search) {
    var numberPattern = /^[0-9]+$/;
    var letterPattern = /^[A-Za-z]+$/;
    if (numberPattern.test(search)) {
        return 'case_number';
    }
    else if (letterPattern.test(search)) {
        return 'debtors_name';
    }
    else {
        return 'unknown'; // You can return a default value or handle other cases as needed
    }
};
exports.identifySearchedString = identifySearchedString;
var buildPeopleNameSearchConditions = function (builder, term) {
    if (term.includes(' ')) {
        var _a = term.split(' '), firstName_3 = _a[0], lastName_3 = _a[1];
        builder
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(p.first_name) = ?', [
                    firstName_3.toLowerCase(),
                ]).andWhereRaw('LOWER(p.last_name) LIKE ?', [
                    "%".concat(lastName_3.toLowerCase(), "%"),
                ]);
            }).orWhere(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(lastName_3.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName_3.toLowerCase()]);
            });
        })
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(firstName_3.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [lastName_3.toLowerCase()]);
            }).orWhere(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(lastName_3.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName_3.toLowerCase()]);
            });
        });
    }
    else {
        builder.orWhere(function () {
            this.whereRaw('LOWER(p.first_name) LIKE ?', [
                "%".concat(term.toLowerCase(), "%"),
            ]).orWhereRaw('LOWER(p.last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
        });
    }
};
exports.buildPeopleNameSearchConditions = buildPeopleNameSearchConditions;
