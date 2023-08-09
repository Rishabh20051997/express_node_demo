import { body, param } from "express-validator";
import { errorValidator } from "./validators";

const mongoIdValidator = [
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Valid Id required'),
    errorValidator
]

export const createEmployeeValidator = [
    body('firstname').exists().isString().withMessage('First Name is required'), 
    body('lastname').exists().isString().withMessage('Last Name is required'),
    errorValidator
]


export const employeeUpdateValidator = [ ...mongoIdValidator]

export const employeeDeleteValidator = [ ...mongoIdValidator]

export const getEmployeeValidator = [ ...mongoIdValidator]