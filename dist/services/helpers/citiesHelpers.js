"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCitiesNameSearchConditions = void 0;
var buildCitiesNameSearchConditions = function (builder, term) {
    builder.orWhere(function () {
        this.whereRaw('LOWER(ci.name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    });
};
exports.buildCitiesNameSearchConditions = buildCitiesNameSearchConditions;
