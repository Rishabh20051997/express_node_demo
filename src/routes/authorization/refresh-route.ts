import { Router } from 'express'

import { handleRefreshToken } from '@controllers/auth/refresh-token-controller'

const refreshRouter = Router();

refreshRouter.post('/', handleRefreshToken);

export default refreshRouter