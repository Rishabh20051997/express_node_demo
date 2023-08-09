import { Router } from 'express'

import { loginUserController } from '@controllers/auth/auth-controller'
import { authValidator } from '@serializers/validators/auth-validators';

const authRouter = Router();

authRouter.post('/', authValidator, loginUserController);


export default authRouter