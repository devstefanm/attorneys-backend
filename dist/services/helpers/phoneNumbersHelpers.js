"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPhoneNumberForDisplay = void 0;
var mapPhoneNumberForDisplay = function (phoneNumber) {
    if (phoneNumber.length >= 8 && phoneNumber.length <= 13) {
        if (phoneNumber.startsWith('0')) {
            // If it starts with '0', insert '/' after the next two digits
            return "".concat(phoneNumber.slice(0, 3), "/").concat(phoneNumber.slice(3));
        }
        else {
            // Remove the first three digits and the plus sign
            var transformedNumber = phoneNumber.slice(3);
            // Insert '0' at the beginning and '/' after the next two digits
            return "0".concat(transformedNumber.slice(1, 3), "/").concat(transformedNumber.slice(3));
        }
    }
    return phoneNumber;
};
exports.mapPhoneNumberForDisplay = mapPhoneNumberForDisplay;
