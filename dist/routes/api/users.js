"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../../controllers/api/users-controller");
const roles_list_1 = require("../../common/roles-list");
const verify_roles_1 = require("../../middleware/verify-roles");
const userRouter = (0, express_1.Router)();
userRouter.route('/')
    .get((0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), users_controller_1.getAllUsers)
    .delete((0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), users_controller_1.deleteUser);
userRouter.route('/:id')
    .get((0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), users_controller_1.getUser);
exports.default = userRouter;
//# sourceMappingURL=users.js.map