"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTypeForExport = exports.trimSemicolons = exports.transformTransactionType = exports.reverseHeaderMapping = void 0;
var transactionsServicesData_1 = require("../transactionsServices/transactionsServicesData");
var transactionsTypes_1 = require("../../types/transactionsTypes");
var reverseHeaderMapping = function (importedHeaders) {
    var reversedHeaders = importedHeaders.map(function (header) {
        // Try to find a matching header in the reverse mapping
        var reversedHeader = Object.keys(transactionsServicesData_1.HeadersRecord).find(function (key) {
            return header.includes(transactionsServicesData_1.HeadersRecord[key]);
        });
        // Use the original header if a match is found, or keep the imported header
        return reversedHeader || header;
    });
    return reversedHeaders;
};
exports.reverseHeaderMapping = reverseHeaderMapping;
var transformTransactionType = function (input) {
    var wordMap = {
        Uplata: 'payment',
        Taksa: 'fee',
        'Sudska taksa': 'legal_fee',
        'Povlačenje predmeta': 'withdrawal',
    };
    // Check if the input word exists in the map, and return the corresponding transformed word.
    if (wordMap.hasOwnProperty(input)) {
        return wordMap[input];
    }
    else {
        // If the input word is not found in the map, return it as is.
        return input;
    }
};
exports.transformTransactionType = transformTransactionType;
var trimSemicolons = function (input) {
    // Use the String.replace() method to replace all semicolons with an empty string.
    return input.replace(/;/g, '');
};
exports.trimSemicolons = trimSemicolons;
var transformTypeForExport = function (type) {
    switch (type) {
        case transactionsTypes_1.ETransactionType.payment:
            return 'Uplata';
        case transactionsTypes_1.ETransactionType.fee:
            return 'Taksa';
        case transactionsTypes_1.ETransactionType.legal_fee:
            return 'Sudska taksa';
        case transactionsTypes_1.ETransactionType.withdrawal:
            return 'Povlačenje predmeta';
    }
};
exports.transformTypeForExport = transformTypeForExport;
