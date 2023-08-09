"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("@controllers/api/users-controller");
const roles_list_1 = require("@common/roles-list");
const verify_roles_1 = require("@middleware/verify-roles");
const user_validator_1 = require("@serializers/validators/user-validator");
const userRouter = (0, express_1.Router)();
userRouter.route('/')
    .get((0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), users_controller_1.userListController);
userRouter.route('/:id')
    .get(user_validator_1.userUpdateValidator, (0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), users_controller_1.getUserController)
    .delete(user_validator_1.getUserValidator, (0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), users_controller_1.deleteUserController);
exports.default = userRouter;
//# sourceMappingURL=users-route.js.map