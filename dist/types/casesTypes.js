"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECaseCategory = exports.EState = void 0;
var EState;
(function (EState) {
    EState["active"] = "active";
    EState["closed"] = "closed";
})(EState || (exports.EState = EState = {}));
var ECaseCategory;
(function (ECaseCategory) {
    ECaseCategory["withdrawn"] = "withdrawn";
    ECaseCategory["combined"] = "combined";
    ECaseCategory["obsolete"] = "obsolete";
    ECaseCategory["with_payment"] = "with_payment";
})(ECaseCategory || (exports.ECaseCategory = ECaseCategory = {}));
