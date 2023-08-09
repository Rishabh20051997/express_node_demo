import { Router } from 'express'

import { ROLES_LIST } from '@common/roles-list'
import { verifyRoles } from '@middleware/verify-roles'

import {
    employeeListController,
    createEmployeeController,
    updateEmployeeController,
    deleteEmployeeController,
    getEmployeeController
} from '@controllers/api/employees-controller'
import { createEmployeeValidator, employeeDeleteValidator, employeeUpdateValidator, getEmployeeValidator } from '@serializers/validators/employee-validator';

const employeeRouter = Router();

employeeRouter.route('/')
    .get(employeeListController)
    .post(createEmployeeValidator, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployeeController)


employeeRouter.route('/:id')
    .get(getEmployeeValidator, getEmployeeController)
    .put(verifyRoles(employeeUpdateValidator, ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployeeController)
    .delete(verifyRoles(employeeDeleteValidator, ROLES_LIST.Admin), deleteEmployeeController);

export default employeeRouter


