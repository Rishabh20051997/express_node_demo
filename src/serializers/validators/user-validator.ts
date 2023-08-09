import { param } from "express-validator"
import { errorValidator } from "./validators"

const mongoIdValidator = [
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Valid Id required'),
    errorValidator
]


export const userUpdateValidator = [ ...mongoIdValidator]

export const getUserValidator = [ ...mongoIdValidator]