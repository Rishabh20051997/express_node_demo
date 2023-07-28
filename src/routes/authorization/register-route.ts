

import { Router } from 'express'

import { handleNewUser } from '@controllers/auth/register-controller'

const registerRouter = Router();

registerRouter.post('/', handleNewUser);

export default registerRouter


