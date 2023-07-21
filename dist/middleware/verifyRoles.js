"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoles = void 0;
const constant_1 = require("../common/constant");
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.roles))
            return res.status(constant_1.STATUS_CODE.ACCESS_DENIED).json({ status: constant_1.STATUS_CODE.ACCESS_DENIED, "message": 'Access Missing' });
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result)
            return res.status(constant_1.STATUS_CODE.ACCESS_DENIED).json({ status: constant_1.STATUS_CODE.ACCESS_DENIED, "message": 'Access Missing' });
        next();
    };
};
exports.verifyRoles = verifyRoles;
//# sourceMappingURL=verifyRoles.js.map