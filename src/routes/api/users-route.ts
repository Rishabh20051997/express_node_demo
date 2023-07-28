

import { Router } from 'express'

import { getAllUsers, deleteUser, getUser } from '@controllers/api/users-controller'
import { ROLES_LIST } from '@common/roles-list'
import { verifyRoles } from '@middleware/verify-roles'

const userRouter = Router();

userRouter.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

userRouter.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), getUser);


export default userRouter
