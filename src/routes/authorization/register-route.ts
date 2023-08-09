

import { Router } from 'express'

import { registerUserController } from '@controllers/auth/register-controller'
import { registerUserValidator } from '@serializers/validators/auth-validators';

const registerRouter = Router();

registerRouter.post('/', registerUserValidator, registerUserController);

export default registerRouter


