"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolesOnBasisOfUserType = void 0;
const _constant_1 = require("@constant");
const getRolesOnBasisOfUserType = (userType) => {
    let userRoles;
    if (userType === _constant_1.USER_TYPES.ADMIN) {
        userRoles = {
            "Admin": 5150,
            "Editor": 1984,
            "User": 2001
        };
    }
    else if (userType === _constant_1.USER_TYPES.EDITOR) {
        userRoles = {
            "Editor": 1984,
            "User": 2001
        };
    }
    else {
        // 'User'
        userRoles = {
            "Editor": 1984,
            "User": 2001
        };
    }
    return userRoles;
};
exports.getRolesOnBasisOfUserType = getRolesOnBasisOfUserType;
//# sourceMappingURL=user-type-roles-helpers.js.map