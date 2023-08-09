import { body, checkSchema } from "express-validator";
import { errorValidator } from "./validators";
import { USER_TYPES } from "@constant";
import { getUserByUserName } from "@use-cases/user-use-cases";
import User from '@model/user-model'
import { AUTHORIZATION_STRINGS } from "@common/strings";
import { sendResponse } from "@services/response-transmitter";

const loginValidator = [
    body('userName').exists().isString().withMessage('User Name is required'),
    body('password').exists().isString().withMessage('Password is required'),
]

export const authValidator = [
    ...loginValidator,
    errorValidator
]

export const registerUserValidator = [
    ...loginValidator,
    body('userType').exists().withMessage('User Type is required').isString().isIn(Object.values(USER_TYPES)).withMessage('User Type should be of valid type'),
    errorValidator,
    async (req:IRequest, res:IResponse, next) =>  {
        // check for duplicate usernames in the db
        const duplicate = await getUserByUserName(User, { userName: req.body.userName });
        //Conflict -> User already exists
        if (duplicate) {
            return sendResponse.conflictRequest(res, { message: AUTHORIZATION_STRINGS.ALREADY_EXISTS })
        }
        next()
    }
]


