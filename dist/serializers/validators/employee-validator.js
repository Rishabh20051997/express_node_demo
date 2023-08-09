"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeValidator = exports.employeeDeleteValidator = exports.employeeUpdateValidator = exports.createEmployeeValidator = void 0;
const express_validator_1 = require("express-validator");
const validators_1 = require("./validators");
const mongoIdValidator = [
    (0, express_validator_1.param)('id').exists().withMessage('Id is required').isMongoId().withMessage('Valid Id required'),
    validators_1.errorValidator
];
exports.createEmployeeValidator = [
    (0, express_validator_1.body)('firstname').exists().isString().withMessage('First Name is required'),
    (0, express_validator_1.body)('lastname').exists().isString().withMessage('Last Name is required'),
    validators_1.errorValidator
];
exports.employeeUpdateValidator = [...mongoIdValidator];
exports.employeeDeleteValidator = [...mongoIdValidator];
exports.getEmployeeValidator = [...mongoIdValidator];
//# sourceMappingURL=employee-validator.js.map