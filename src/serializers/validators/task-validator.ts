import { body } from "express-validator";
import { errorValidator } from "./validators";

export const taskCreateValidator = [
    body('task').exists().isString().withMessage('Task is Missing'), 
    errorValidator
]