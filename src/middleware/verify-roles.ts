
import { STATUS_CODE } from "@constant";

export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.status(STATUS_CODE.ACCESS_DENIED).json({ status: STATUS_CODE.ACCESS_DENIED, "message": 'Access Missing' });
        } 
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result){
            return res.status(STATUS_CODE.ACCESS_DENIED).json({ status: STATUS_CODE.ACCESS_DENIED, "message": 'Access Missing' });
        } 
        next();
    }
}