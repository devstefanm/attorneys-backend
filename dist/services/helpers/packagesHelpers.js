"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPackagesNameSearchConditions = void 0;
var buildPackagesNameSearchConditions = function (builder, term) {
    builder.orWhere(function () {
        this.whereRaw('LOWER(pck.package_name) LIKE ?', [
            "%".concat(term.toLowerCase(), "%"),
        ]);
    });
};
exports.buildPackagesNameSearchConditions = buildPackagesNameSearchConditions;
