"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserValidator = exports.userUpdateValidator = void 0;
const express_validator_1 = require("express-validator");
const validators_1 = require("./validators");
const mongoIdValidator = [
    (0, express_validator_1.param)('id').exists().withMessage('Id is required').isMongoId().withMessage('Valid Id required'),
    validators_1.errorValidator
];
exports.userUpdateValidator = [...mongoIdValidator];
exports.getUserValidator = [...mongoIdValidator];
//# sourceMappingURL=user-validator.js.map