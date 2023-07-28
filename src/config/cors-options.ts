import { CORS_ERROR_MESSAGE } from '@common/strings';
import { allowedOrigins } from '@config/allowed-origins'

// cors configuration 
export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error(CORS_ERROR_MESSAGE));
        }
    },
    optionsSuccessStatus: 200
}