"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClientsNameSearchConditions = void 0;
var buildClientsNameSearchConditions = function (builder, term) {
    builder.orWhere(function () {
        this.whereRaw('LOWER(cl.name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    });
};
exports.buildClientsNameSearchConditions = buildClientsNameSearchConditions;
