"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../../controllers/usersController");
const roles_list_1 = require("../../config/roles_list");
const verifyRoles_1 = require("../../middleware/verifyRoles");
const userRouter = (0, express_1.Router)();
userRouter.route('/')
    .get((0, verifyRoles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), usersController_1.getAllUsers)
    .delete((0, verifyRoles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), usersController_1.deleteUser);
userRouter.route('/:id')
    .get((0, verifyRoles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), usersController_1.getUser);
exports.default = userRouter;
//# sourceMappingURL=users.js.map