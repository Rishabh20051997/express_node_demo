import { USER_TYPES } from "@constant"

type IRolesObjectTypes = {
    [P in IUserTypes ]: number;
};


/**
 * 
 * @param {USER_TYPES} userType 
 * @returns userRoles Objects
 */
const getRolesOnBasisOfUserType = (userType: USER_TYPES): IRolesObjectTypes => {
    let userRoles

    if (userType === USER_TYPES.ADMIN) {
        userRoles = {
            "Admin": 5150,
            "Editor": 1984,
            "User": 2001
        }

    } else if (userType === USER_TYPES.EDITOR) {
        userRoles = {
            "Editor": 1984,
            "User": 2001
        }
    } else {
        // 'User'
        userRoles = {
            "Editor": 1984,
            "User": 2001
        }
    }

    return userRoles
}

export {
    getRolesOnBasisOfUserType
}