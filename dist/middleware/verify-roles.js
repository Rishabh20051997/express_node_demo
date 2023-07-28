"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoles = void 0;
const response_transmitter_1 = require("@services/response-transmitter");
// middleware to verify users roles & provide access only if has appropriate role access
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.roles)) {
            return (0, response_transmitter_1.sendAccessDeniedRequestResponse)(res);
        }
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) {
            return (0, response_transmitter_1.sendAccessDeniedRequestResponse)(res);
        }
        next();
    };
};
exports.verifyRoles = verifyRoles;
//# sourceMappingURL=verify-roles.js.map