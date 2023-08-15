"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEmployersNameSearchConditions = void 0;
var buildEmployersNameSearchConditions = function (builder, term) {
    builder.orWhere(function () {
        this.whereRaw('LOWER(emp.name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    });
};
exports.buildEmployersNameSearchConditions = buildEmployersNameSearchConditions;
