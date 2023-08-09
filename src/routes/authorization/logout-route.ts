import { Router } from 'express'

import { logoutUserController } from '@controllers/auth/logout-controller'

const logoutRouter = Router();

logoutRouter.post('/', logoutUserController);

export default logoutRouter