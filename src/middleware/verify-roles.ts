
import { sendAccessDeniedRequestResponse } from "@services/response-transmitter";

// middleware to verify users roles & provide access only if has appropriate role access
export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return sendAccessDeniedRequestResponse(res)
        } 
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result){
            return sendAccessDeniedRequestResponse(res)
        } 
        next();
    }
}