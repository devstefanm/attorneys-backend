"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialCharactersChecker = exports.generateShortNameSearchQuery = exports.generateFullNameSearchQuery = void 0;
var specialCharacters_1 = __importDefault(require("./specialCharacters"));
var generateFullNameSearchQuery = function (query, searchTerms) {
    query.where(function () {
        var _loop_1 = function (term) {
            if (term.includes(' ')) {
                var _a = term.split(' '), firstName_1 = _a[0], lastName_1 = _a[1];
                this_1.orWhere(function () {
                    this.where(function () {
                        this.whereRaw('LOWER(first_name) = ?', [
                            firstName_1.toLowerCase(),
                        ]).andWhereRaw('LOWER(last_name) LIKE ?', [
                            "%".concat(lastName_1.toLowerCase(), "%"),
                        ]);
                    }).orWhere(function () {
                        this.whereRaw('LOWER(first_name) LIKE ?', [
                            "%".concat(lastName_1.toLowerCase(), "%"),
                        ]).andWhereRaw('LOWER(last_name) = ?', [firstName_1.toLowerCase()]);
                    });
                }).orWhere(function () {
                    this.where(function () {
                        this.whereRaw('LOWER(first_name) LIKE ?', [
                            "%".concat(firstName_1.toLowerCase(), "%"),
                        ]).andWhereRaw('LOWER(last_name) = ?', [lastName_1.toLowerCase()]);
                    }).orWhere(function () {
                        this.whereRaw('LOWER(first_name) LIKE ?', [
                            "%".concat(lastName_1.toLowerCase(), "%"),
                        ]).andWhereRaw('LOWER(last_name) = ?', [firstName_1.toLowerCase()]);
                    });
                });
            }
            else {
                this_1.orWhere(function () {
                    this.whereRaw('LOWER(first_name) LIKE ?', [
                        "%".concat(term.toLowerCase(), "%"),
                    ]).orWhereRaw('LOWER(last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, searchTerms_1 = searchTerms; _i < searchTerms_1.length; _i++) {
            var term = searchTerms_1[_i];
            _loop_1(term);
        }
    });
    return query;
};
exports.generateFullNameSearchQuery = generateFullNameSearchQuery;
var generateShortNameSearchQuery = function (query, searchTerms) {
    query.where(function () {
        var _loop_2 = function (term) {
            this_2.orWhere(function () {
                this.whereRaw('LOWER(name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
            });
        };
        var this_2 = this;
        for (var _i = 0, searchTerms_2 = searchTerms; _i < searchTerms_2.length; _i++) {
            var term = searchTerms_2[_i];
            _loop_2(term);
        }
    });
    return query;
};
exports.generateShortNameSearchQuery = generateShortNameSearchQuery;
var specialCharactersChecker = function (searchTerm) {
    // Create an array to store the search terms
    var searchTerms = [searchTerm];
    // Iterate through the characters in the search term
    for (var i = 0; i < searchTerm.length; i++) {
        var char = searchTerm[i];
        var replacements = specialCharacters_1.default[char.toLowerCase()];
        if (replacements) {
            var modifiedTerms = [];
            for (var _i = 0, searchTerms_3 = searchTerms; _i < searchTerms_3.length; _i++) {
                var term = searchTerms_3[_i];
                for (var _a = 0, replacements_1 = replacements; _a < replacements_1.length; _a++) {
                    var replacement = replacements_1[_a];
                    var modifiedTerm = term.slice(0, i) + replacement + term.slice(i + 1);
                    if (!searchTerms.includes(modifiedTerm)) {
                        modifiedTerms.push(modifiedTerm);
                    }
                }
            }
            searchTerms.push.apply(searchTerms, modifiedTerms);
        }
    }
    return searchTerms;
};
exports.specialCharactersChecker = specialCharactersChecker;
