"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCourtsNameSearchConditions = void 0;
var buildCourtsNameSearchConditions = function (builder, term) {
    builder.orWhere(function () {
        this.whereRaw('LOWER(co.name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    });
};
exports.buildCourtsNameSearchConditions = buildCourtsNameSearchConditions;
