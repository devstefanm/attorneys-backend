"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatImportNames = exports.uppercaseFirstLetter = exports.formatDateToISO = exports.formatDateToDDMMYYYY = exports.capitalizeEveryWord = void 0;
var capitalizeEveryWord = function (sentence) {
    // Split the sentence into words
    var words = sentence.split(' ');
    // Capitalize the first letter of each word and join them back together
    var capitalizedWords = words.map(function (word) {
        if (word.length === 0) {
            return '';
        }
        return word[0].toUpperCase() + word.slice(1);
    });
    // Join the capitalized words with spaces to form the final sentence
    var capitalizedSentence = capitalizedWords.join(' ');
    return capitalizedSentence;
};
exports.capitalizeEveryWord = capitalizeEveryWord;
// Function to convert "YYYY-MM-DDTHH:mm:ss.sssZ" to "DD.MM.YYYY"
var formatDateToDDMMYYYY = function (inputDate) {
    var date = new Date(inputDate);
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = String(date.getFullYear());
    return "".concat(day, ".").concat(month, ".").concat(year);
};
exports.formatDateToDDMMYYYY = formatDateToDDMMYYYY;
// Function to convert "DD.MM.YYYY" to "YYYY-MM-DDTHH:mm:ss.sssZ"
var formatDateToISO = function (inputDate) {
    var dateParts = inputDate.split('.');
    if (dateParts.length === 3) {
        var day = parseInt(dateParts[0], 10);
        var month = parseInt(dateParts[1], 10) - 1; // Months are 0-based in JavaScript
        var year = parseInt(dateParts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            var date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                return date.toISOString();
            }
        }
    }
    return null; // Invalid input
};
exports.formatDateToISO = formatDateToISO;
var uppercaseFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.uppercaseFirstLetter = uppercaseFirstLetter;
var formatImportNames = function (input) {
    // Replace dots, commas, and multiple whitespaces with a single space
    var cleanedString = input.replace(/\s+/g, ' ');
    // Uppercase the first letter of every word
    var words = cleanedString.split(/\s+/);
    // Capitalize the first letter of each word
    var formattedWords = words.map(function (word) {
        if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word; // If the word is empty, preserve it as is
    });
    // Join the words back together with spaces
    var formattedString = formattedWords.join(' ');
    return formattedString;
};
exports.formatImportNames = formatImportNames;
