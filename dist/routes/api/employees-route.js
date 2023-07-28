"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_list_1 = require("@common/roles-list");
const verify_roles_1 = require("@middleware/verify-roles");
const employees_controller_1 = require("@controllers/api/employees-controller");
const employeeRouter = (0, express_1.Router)();
employeeRouter.route('/')
    .get(employees_controller_1.getAllEmployees)
    .post((0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin, roles_list_1.ROLES_LIST.Editor), employees_controller_1.createNewEmployee)
    .put((0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin, roles_list_1.ROLES_LIST.Editor), employees_controller_1.updateEmployee)
    .delete((0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), employees_controller_1.deleteEmployee);
employeeRouter.route('/:id')
    .get(employees_controller_1.getEmployee);
exports.default = employeeRouter;
//# sourceMappingURL=employees-route.js.map