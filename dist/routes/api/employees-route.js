"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_list_1 = require("@common/roles-list");
const verify_roles_1 = require("@middleware/verify-roles");
const employees_controller_1 = require("@controllers/api/employees-controller");
const employee_validator_1 = require("@serializers/validators/employee-validator");
const employeeRouter = (0, express_1.Router)();
employeeRouter.route('/')
    .get(employees_controller_1.employeeListController)
    .post(employee_validator_1.createEmployeeValidator, (0, verify_roles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin, roles_list_1.ROLES_LIST.Editor), employees_controller_1.createEmployeeController);
employeeRouter.route('/:id')
    .get(employee_validator_1.getEmployeeValidator, employees_controller_1.getEmployeeController)
    .put((0, verify_roles_1.verifyRoles)(employee_validator_1.employeeUpdateValidator, roles_list_1.ROLES_LIST.Admin, roles_list_1.ROLES_LIST.Editor), employees_controller_1.updateEmployeeController)
    .delete((0, verify_roles_1.verifyRoles)(employee_validator_1.employeeDeleteValidator, roles_list_1.ROLES_LIST.Admin), employees_controller_1.deleteEmployeeController);
exports.default = employeeRouter;
//# sourceMappingURL=employees-route.js.map