import { Router } from 'express'

import { handleLogout } from '../../controllers/logoutController'

const logoutRouter = Router();

logoutRouter.post('/', handleLogout);

export default logoutRouter