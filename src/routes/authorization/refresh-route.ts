import { Router } from 'express'

import { refreshTokenController } from '@controllers/auth/refresh-token-controller'

const refreshRouter = Router();

refreshRouter.post('/', refreshTokenController);

export default refreshRouter