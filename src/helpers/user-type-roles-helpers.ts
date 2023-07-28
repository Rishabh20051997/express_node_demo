import { USER_TYPES } from "@constant"

const getRolesOnBasisOfUserType = (userType: USER_TYPES) => {
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