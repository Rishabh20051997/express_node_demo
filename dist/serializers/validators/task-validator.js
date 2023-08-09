"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskCreateValidator = void 0;
const express_validator_1 = require("express-validator");
const validators_1 = require("./validators");
exports.taskCreateValidator = [
    (0, express_validator_1.body)('task').exists().isString().withMessage('Task is Missing'),
    validators_1.errorValidator
];
//# sourceMappingURL=task-validator.js.map