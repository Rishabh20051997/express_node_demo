"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_list_1 = require("../../config/roles_list");
const verifyRoles_1 = require("../../middleware/verifyRoles");
const employeesController_1 = require("../../controllers/employeesController");
const employeeRouter = (0, express_1.Router)();
employeeRouter.route('/')
    .get(employeesController_1.getAllEmployees)
    .post((0, verifyRoles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin, roles_list_1.ROLES_LIST.Editor), employeesController_1.createNewEmployee)
    .put((0, verifyRoles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin, roles_list_1.ROLES_LIST.Editor), employeesController_1.updateEmployee)
    .delete((0, verifyRoles_1.verifyRoles)(roles_list_1.ROLES_LIST.Admin), employeesController_1.deleteEmployee);
employeeRouter.route('/:id')
    .get(employeesController_1.getEmployee);
exports.default = employeeRouter;
//# sourceMappingURL=employees.js.map