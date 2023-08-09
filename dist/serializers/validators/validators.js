"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidator = void 0;
const express_validator_1 = require("express-validator");
const errorValidator = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        return next();
    }
    return res.send({ errors: result.array() });
};
exports.errorValidator = errorValidator;
//# sourceMappingURL=validators.js.map