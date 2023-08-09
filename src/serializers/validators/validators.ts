import { param, validationResult } from "express-validator";

export const errorValidator = (req: IRequest, res: IResponse, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next()
    }

    return res.send({ errors: result.array() });
}