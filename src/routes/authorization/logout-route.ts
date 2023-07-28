import { Router } from 'express'

import { handleLogout } from '@controllers/auth/logout-controller'

const logoutRouter = Router();

logoutRouter.post('/', handleLogout);

export default logoutRouter