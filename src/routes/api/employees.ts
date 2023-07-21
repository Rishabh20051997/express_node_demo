import { Router } from 'express'

import { ROLES_LIST } from '../../config/roles_list'
import { verifyRoles } from '../../middleware/verifyRoles'

import { 
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee}
     from '../../controllers/employeesController'

const employeeRouter = Router();

employeeRouter.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

    employeeRouter.route('/:id')
    .get(getEmployee);

export default employeeRouter