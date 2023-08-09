

import { Router } from 'express'

import { userListController, deleteUserController, getUserController } from '@controllers/api/users-controller'
import { ROLES_LIST } from '@common/roles-list'
import { verifyRoles } from '@middleware/verify-roles'
import { getUserValidator, userUpdateValidator } from '@serializers/validators/user-validator';

const userRouter = Router();

userRouter.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), userListController)
    

userRouter.route('/:id')
    .get(userUpdateValidator, verifyRoles(ROLES_LIST.Admin), getUserController)
    .delete(getUserValidator, verifyRoles(ROLES_LIST.Admin), deleteUserController);


export default userRouter

