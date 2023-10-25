"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCurrentDebt = exports.calculateTypeSums = exports.generateQueryColumns = exports.generateRandomString = exports.transformParsedDataToCase = exports.splitLawyerName = exports.transformIndexedFieldsToCasesArrays = exports.reverseHeaderMapping = exports.transformCasesArraysToIndexedFields = exports.buildPeopleNameSearchConditions = exports.identifySearchedString = exports.generateJmbgAndPibSearchQuery = exports.buildLawyerNameSearchConditions = exports.buildCasesNameSearchConditions = void 0;
var casesServicesData_1 = require("../casesServices/casesServicesData");
var universalHelpers_1 = require("./universalHelpers");
var attorneys_db_1 = require("../../attorneys-db");
var transformData_1 = require("../../utils/transformData");
var buildCasesNameSearchConditions = function (builder, term) {
    if (term.includes(' ')) {
        var _a = term.split(' '), firstName_1 = _a[0], lastName_1 = _a[1];
        builder
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(p.first_name) = ?', [
                    firstName_1.toLowerCase(),
                ]).andWhereRaw('LOWER(p.last_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]);
            }).orWhere(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName_1.toLowerCase()]);
            });
        })
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(firstName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [lastName_1.toLowerCase()]);
            }).orWhere(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(lastName_1.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName_1.toLowerCase()]);
            });
        })
            .orWhereRaw('LOWER(o.name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    }
    else {
        builder.orWhere(function () {
            this.whereRaw('LOWER(p.first_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")])
                .orWhereRaw('LOWER(p.last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")])
                .orWhereRaw('LOWER(o.name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
        });
    }
};
exports.buildCasesNameSearchConditions = buildCasesNameSearchConditions;
var buildLawyerNameSearchConditions = function (builder, term) {
    if (term.includes(' ')) {
        var _a = term.split(' '), firstName_2 = _a[0], lastName_2 = _a[1];
        builder
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(l.first_name) = ?', [
                    firstName_2.toLowerCase(),
                ]).andWhereRaw('LOWER(l.last_name) LIKE ?', [
                    "%".concat(lastName_2.toLowerCase(), "%"),
                ]);
            }).orWhere(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(lastName_2.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName_2.toLowerCase()]);
            });
        })
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(firstName_2.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [lastName_2.toLowerCase()]);
            }).orWhere(function () {
                this.whereRaw('LOWER(l.first_name) LIKE ?', [
                    "%".concat(lastName_2.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName_2.toLowerCase()]);
            });
        })
            .orWhereRaw('LOWER(l.office_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
    }
    else {
        builder.orWhere(function () {
            this.whereRaw('LOWER(l.first_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")])
                .orWhereRaw('LOWER(l.last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")])
                .orWhereRaw('LOWER(l.office_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
        });
    }
};
exports.buildLawyerNameSearchConditions = buildLawyerNameSearchConditions;
var generateJmbgAndPibSearchQuery = function (query, searchNumber) {
    query.where(function () {
        this.orWhereRaw('p.jmbg::text LIKE ?', ["%".concat(searchNumber, "%")]).orWhereRaw('o.pib::text LIKE ?', ["%".concat(searchNumber, "%")]);
    });
    return query;
};
exports.generateJmbgAndPibSearchQuery = generateJmbgAndPibSearchQuery;
var identifySearchedString = function (search) {
    var numberPattern = /^[0-9]+$/;
    var letterPattern = /^[A-Za-z]+$/;
    if (numberPattern.test(search)) {
        return 'case_number';
    }
    else if (letterPattern.test(search)) {
        return 'debtors_name';
    }
    else {
        return 'unknown'; // You can return a default value or handle other cases as needed
    }
};
exports.identifySearchedString = identifySearchedString;
var buildPeopleNameSearchConditions = function (builder, term) {
    if (term.includes(' ')) {
        var _a = term.split(' '), firstName_3 = _a[0], lastName_3 = _a[1];
        builder
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(p.first_name) = ?', [
                    firstName_3.toLowerCase(),
                ]).andWhereRaw('LOWER(p.last_name) LIKE ?', [
                    "%".concat(lastName_3.toLowerCase(), "%"),
                ]);
            }).orWhere(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(lastName_3.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName_3.toLowerCase()]);
            });
        })
            .orWhere(function () {
            this.where(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(firstName_3.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [lastName_3.toLowerCase()]);
            }).orWhere(function () {
                this.whereRaw('LOWER(p.first_name) LIKE ?', [
                    "%".concat(lastName_3.toLowerCase(), "%"),
                ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName_3.toLowerCase()]);
            });
        });
    }
    else {
        builder.orWhere(function () {
            this.whereRaw('LOWER(p.first_name) LIKE ?', [
                "%".concat(term.toLowerCase(), "%"),
            ]).orWhereRaw('LOWER(p.last_name) LIKE ?', ["%".concat(term.toLowerCase(), "%")]);
        });
    }
};
exports.buildPeopleNameSearchConditions = buildPeopleNameSearchConditions;
var transformCasesArraysToIndexedFields = function (casesResults) {
    var transformedCases = casesResults;
    return transformedCases.map(function (casesResult) {
        var entering_date = casesResult.entering_date, lawyer_hand_over_date = casesResult.lawyer_hand_over_date, closing_date = casesResult.closing_date, phone_numbers = casesResult.phone_numbers, business_numbers = casesResult.business_numbers, executors = casesResult.executors;
        if (entering_date) {
            entering_date = (0, transformData_1.formatDateToDDMMYYYY)(entering_date);
        }
        if (entering_date) {
            lawyer_hand_over_date = (0, transformData_1.formatDateToDDMMYYYY)(lawyer_hand_over_date);
        }
        if (entering_date) {
            closing_date = (0, transformData_1.formatDateToDDMMYYYY)(closing_date);
        }
        // Transform phone_numbers into phone_number_N format
        if (typeof phone_numbers !== 'string' &&
            phone_numbers &&
            phone_numbers.length > 0) {
            for (var index = 0; index < 4; index++) {
                casesResult["phone_number_".concat(index + 1)] = phone_numbers[index] || '';
            }
            delete casesResult.phone_numbers;
        }
        // Transform business_numbers into business_number_N format
        if (typeof business_numbers !== 'string' &&
            business_numbers &&
            business_numbers.length > 0) {
            for (var index = 0; index < 2; index++) {
                casesResult["business_number_".concat(index + 1)] =
                    business_numbers[index] || '';
            }
            delete casesResult.business_numbers;
        }
        // Transform executors into executors_N format
        if (typeof executors !== 'string' && executors && executors.length > 0) {
            for (var index = 0; index < 2; index++) {
                casesResult["executor_".concat(index + 1)] = executors[index] || '';
            }
            delete casesResult.executors;
        }
        return casesResult;
    });
};
exports.transformCasesArraysToIndexedFields = transformCasesArraysToIndexedFields;
var reverseHeaderMapping = function (importedHeaders) {
    var reversedHeaders = importedHeaders.map(function (header) {
        // Try to find a matching header in the reverse mapping
        var reversedHeader = Object.keys(casesServicesData_1.HeadersRecord).find(function (key) { return casesServicesData_1.HeadersRecord[key] === header; });
        // Use the original header if a match is found, or keep the imported header
        return reversedHeader || header;
    });
    return reversedHeaders;
};
exports.reverseHeaderMapping = reverseHeaderMapping;
var transformIndexedFieldsToCasesArrays = function (rowDataObject) {
    rowDataObject.phone_numbers = [];
    rowDataObject.executors = [];
    rowDataObject.business_numbers = [];
    for (var i = 1; i <= 4; i++) {
        if (rowDataObject["phone_number_".concat(i)] !== undefined &&
            rowDataObject["phone_number_".concat(i)] !== '') {
            rowDataObject.phone_numbers.push(rowDataObject["phone_number_".concat(i)]);
        }
        delete rowDataObject["phone_number_".concat(i)];
        if (rowDataObject["executor_".concat(i)] !== undefined &&
            rowDataObject["executor_".concat(i)] !== '') {
            rowDataObject.executors.push(rowDataObject["executor_".concat(i)]);
        }
        delete rowDataObject["executor_".concat(i)];
        if (rowDataObject["business_number_".concat(i)] !== undefined &&
            rowDataObject["business_number_".concat(i)] !== '') {
            rowDataObject.business_numbers.push(rowDataObject["business_number_".concat(i)]);
        }
        delete rowDataObject["business_number_".concat(i)];
    }
    return rowDataObject;
};
exports.transformIndexedFieldsToCasesArrays = transformIndexedFieldsToCasesArrays;
var splitLawyerName = function (name) {
    var fullLawyerArr = name.split('(');
    var lawyerName = fullLawyerArr[0].split(' ');
    var lawyer_first_name = lawyerName.shift();
    var lawyer_last_name = lawyerName.join(' ').replace(/\s+$/, '');
    var lawyer_office_name = fullLawyerArr[1]
        ? fullLawyerArr[1].replace(')', '')
        : undefined;
    return {
        lawyer_first_name: lawyer_first_name,
        lawyer_last_name: lawyer_last_name,
        lawyer_office_name: lawyer_office_name,
    };
};
exports.splitLawyerName = splitLawyerName;
var transformParsedDataToCase = function (rowDataObject) {
    var transformedRowDataObject = (0, exports.transformIndexedFieldsToCasesArrays)(rowDataObject);
    // Transform 'DA' to true and 'NE' to false
    Object.keys(transformedRowDataObject).forEach(function (key) {
        var _a;
        if (transformedRowDataObject[key] === 'DA' ||
            transformedRowDataObject[key] === 'NE') {
            var uppercasedRowDataObj = (_a = transformedRowDataObject[key]) === null || _a === void 0 ? void 0 : _a.toUpperCase();
            if (key === 'state') {
                transformedRowDataObject[key] =
                    uppercasedRowDataObj === 'DA'
                        ? 'active'
                        : uppercasedRowDataObj === 'NE'
                            ? 'closed'
                            : uppercasedRowDataObj;
            }
            else if (key === 'is_legal') {
                transformedRowDataObject[key] =
                    uppercasedRowDataObj === 'FIZICKO' ||
                        uppercasedRowDataObj === 'FIZIČKO'
                        ? false
                        : true;
            }
            else {
                transformedRowDataObject[key] = uppercasedRowDataObj === 'DA';
            }
        }
    });
    // Transform 'principal' and 'interest' to numbers
    var numberFields = ['principal', 'interest'];
    numberFields.forEach(function (field) {
        var _a;
        if (transformedRowDataObject[field] &&
            typeof transformedRowDataObject[field] === 'string') {
            transformedRowDataObject[field] = parseFloat((_a = transformedRowDataObject[field]) === null || _a === void 0 ? void 0 : _a.replace(',', ''));
        }
    });
    // Split lawyer name into first name, last name, and office name
    if (transformedRowDataObject['lawyer']) {
        var _a = (0, exports.splitLawyerName)(transformedRowDataObject['lawyer']), lawyer_first_name = _a.lawyer_first_name, lawyer_last_name = _a.lawyer_last_name, lawyer_office_name = _a.lawyer_office_name;
        transformedRowDataObject['lawyer_first_name'] = lawyer_first_name;
        transformedRowDataObject['lawyer_last_name'] = lawyer_last_name;
        transformedRowDataObject['lawyer_office_name'] = lawyer_office_name;
        delete transformedRowDataObject['lawyer'];
    }
    transformedRowDataObject = (0, universalHelpers_1.jmbgAndPibGenerator)(transformedRowDataObject);
    transformedRowDataObject = (0, universalHelpers_1.debtorNameGenerator)(transformedRowDataObject);
    return transformedRowDataObject;
};
exports.transformParsedDataToCase = transformParsedDataToCase;
function generateRandomString(length) {
    var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}
exports.generateRandomString = generateRandomString;
var generateQueryColumns = function (checkedProps) {
    var selectColumns = [];
    var groupByColumns = [];
    if (checkedProps) {
        var caseProps = [
            'case_number',
            'contract_number',
            'principal',
            'interest',
            'old_payment',
            'our_taxes',
            'warning_price',
            'closing_date',
            'entering_date',
            'lawyer_hand_over_date',
            'comment',
        ];
        var debtorProps = ['address', 'email', 'zip_code'];
        for (var _i = 0, caseProps_1 = caseProps; _i < caseProps_1.length; _i++) {
            var caseProp = caseProps_1[_i];
            if (checkedProps.includes(caseProp)) {
                selectColumns.push("c.".concat(caseProp));
                groupByColumns.push("c.".concat(caseProp));
            }
        }
        for (var _a = 0, debtorProps_1 = debtorProps; _a < debtorProps_1.length; _a++) {
            var debtorProp = debtorProps_1[_a];
            if (checkedProps.includes(debtorProp)) {
                selectColumns.push("d.".concat(debtorProp));
                groupByColumns.push("d.".concat(debtorProp));
            }
        }
        if (checkedProps.includes('ssn')) {
            selectColumns.push('s.ssn as ssn');
            groupByColumns.push('s.ssn');
        }
        if (checkedProps.includes('package')) {
            selectColumns.push('pck.package_name as package');
            groupByColumns.push('pck.package_name');
        }
        if (checkedProps.includes('status')) {
            selectColumns.push('st.name as status');
            groupByColumns.push('st.name');
        }
        if (checkedProps.includes('client')) {
            selectColumns.push('cl.name as client');
            groupByColumns.push('cl.name');
        }
        if (checkedProps.includes('court')) {
            selectColumns.push('co.name as court');
            groupByColumns.push('co.name');
        }
        if (checkedProps.includes('status')) {
            selectColumns.push('st.name as status');
            groupByColumns.push('st.name');
        }
        if (checkedProps.includes('limitation_objection')) {
            selectColumns.push(attorneys_db_1.db.raw("CASE WHEN c.limitation_objection = true THEN 'DA' ELSE 'NE' END AS limitation_objection"));
            groupByColumns.push('c.limitation_objection');
        }
        if (checkedProps.includes('is_legal')) {
            selectColumns.push(attorneys_db_1.db.raw("CASE WHEN d.is_legal = true THEN 'PRAVNO' ELSE 'FIZICKO' END AS is_legal"));
            groupByColumns.push('d.is_legal');
        }
        if (checkedProps.includes('cession')) {
            selectColumns.push(attorneys_db_1.db.raw("CASE WHEN d.cession = true THEN 'DA' ELSE 'NE' END AS cession"));
            groupByColumns.push('d.cession');
        }
        if (checkedProps.includes('state')) {
            selectColumns.push(attorneys_db_1.db.raw("CASE WHEN c.state = 'active' THEN 'DA' ELSE 'NE' END AS state"));
            groupByColumns.push('c.state');
        }
        if (checkedProps.includes('employed')) {
            selectColumns.push(attorneys_db_1.db.raw("CASE WHEN p.employed = true THEN 'DA' ELSE 'NE' END AS employed"));
            groupByColumns.push('p.employed');
        }
        if (checkedProps.includes('jmbg_pib')) {
            selectColumns.push(attorneys_db_1.db.raw('CASE WHEN d.is_legal = false OR p.jmbg IS NOT NULL THEN p.jmbg ELSE o.pib END AS jmbg_pib'));
            groupByColumns.push('p.jmbg', 'o.pib');
        }
        if (checkedProps.includes('name')) {
            selectColumns.push(attorneys_db_1.db.raw("CASE WHEN d.is_legal = false OR (p.first_name IS NOT NULL AND p.last_name IS NOT NULL) THEN CONCAT(p.first_name, ' ', p.last_name) ELSE o.name END AS name"));
            groupByColumns.push('p.first_name', 'p.last_name', 'o.name');
        }
        if (checkedProps.includes('lawyer')) {
            selectColumns.push(attorneys_db_1.db.raw("CONCAT(l.first_name, ' ', l.last_name, CASE WHEN l.office_name IS NOT NULL THEN CONCAT(' (', l.office_name, ')') ELSE '' END) AS lawyer"));
            groupByColumns.push('l.first_name', 'l.last_name', 'l.office_name');
        }
        if (checkedProps.includes('employer')) {
            selectColumns.push(attorneys_db_1.db.raw('CASE WHEN COUNT(emp.id) = 0 THEN null ELSE emp.name END as employer'));
            groupByColumns.push('emp.id', 'emp.name');
        }
        if (checkedProps.includes('city')) {
            selectColumns.push(attorneys_db_1.db.raw('CASE WHEN COUNT(ci.id) = 0 THEN null ELSE ci.name END as city'));
            groupByColumns.push('ci.id', 'ci.name');
        }
        if (checkedProps.includes('executors')) {
            selectColumns.push(attorneys_db_1.db.raw("array_agg(distinct e.first_name || ' ' || e.last_name) as executors"));
        }
        if (checkedProps.includes('business_numbers')) {
            selectColumns.push(attorneys_db_1.db.raw('array_agg(distinct bn.number) as business_numbers'));
        }
        if (checkedProps.includes('phone_numbers')) {
            selectColumns.push(attorneys_db_1.db.raw('array_agg(distinct pn.number) as phone_numbers'));
        }
    }
    if (!checkedProps.includes('is_legal') &&
        (checkedProps.includes('jmbg_pib') || checkedProps.includes('name'))) {
        groupByColumns.push('d.is_legal');
    }
    return {
        selectColumns: selectColumns,
        groupByColumns: groupByColumns,
    };
};
exports.generateQueryColumns = generateQueryColumns;
var calculateTypeSums = function (transactions) {
    var typeSums = {};
    for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
        var transaction = transactions_1[_i];
        var amount = transaction.amount, type = transaction.type;
        var amountValue = parseFloat(amount);
        if (!isNaN(amountValue)) {
            if (typeSums[type]) {
                typeSums[type] += amountValue;
            }
            else {
                typeSums[type] = amountValue;
            }
        }
    }
    for (var type in typeSums) {
        if (typeSums.hasOwnProperty(type)) {
            typeSums[type] = parseFloat(typeSums[type].toFixed(2));
        }
    }
    return typeSums;
};
exports.calculateTypeSums = calculateTypeSums;
var calculateCurrentDebt = function (editCaseForm, transactions) {
    var principal = editCaseForm.principal, interest = editCaseForm.interest, warning_price = editCaseForm.warning_price;
    var principalValue = principal ? parseFloat(String(principal)) : 0;
    var interestValue = interest ? parseFloat(String(interest)) : 0;
    var warningPriceValue = warning_price ? parseFloat(String(warning_price)) : 0;
    if (isNaN(principalValue)) {
        principalValue = 0;
    }
    if (isNaN(interestValue)) {
        interestValue = 0;
    }
    if (isNaN(warningPriceValue)) {
        warningPriceValue = 0;
    }
    var currentDebt = principalValue + interestValue + warningPriceValue;
    // Calculate current_debt based on transactions
    if (transactions) {
        currentDebt =
            currentDebt +
                (transactions['fee'] || 0) +
                (transactions['legal_fee'] || 0) -
                (transactions['withdrawal'] || 0) -
                (transactions['payment'] || 0);
    }
    return parseFloat(currentDebt.toFixed(2));
};
exports.calculateCurrentDebt = calculateCurrentDebt;
