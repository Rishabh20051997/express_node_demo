import bcrypt from 'bcrypt'
import User from '../model/User'
import { STATUS_CODE, USER_TYPES } from '../common/constant';
import { log } from '../service/loggerService';

// body {
//     userName: '',
//     password: '',
//     userType: USER_TYPES
// }

export const handleNewUser = async (req, res) => {
    const { userName, password, userType } = req.body;
    if (!userName || !password) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
            status: STATUS_CODE.BAD_REQUEST,
            message: 'Username and password are required.'
        });
    }

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: userName }).exec();

    //Conflict
    if (duplicate) {
        return res.status(STATUS_CODE.CONFLICTS).json({
            status: STATUS_CODE.CONFLICTS,
            message: 'User Already Exists. Please Login to continue'
        });
    }

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
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



        //create and store the new user
        const result = await User.create({
            "username": userName,
            "password": hashedPwd,
            "roles": userRoles
        });

        log(result);

        res.status(STATUS_CODE.CREATED).json({ 
            status: STATUS_CODE.CREATED,
            message: `New user ${userName} created! Please Login to continue.` 
        });
    } catch (err) {

        res.status(STATUS_CODE.SERVER_ERROR).json({ 
            status: STATUS_CODE.SERVER_ERROR,
            message: err.message
        });
    }
}