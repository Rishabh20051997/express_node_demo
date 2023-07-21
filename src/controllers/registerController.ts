import bcrypt from 'bcrypt'
import User from '../model/User'
import { USER_TYPES } from '../common/constant';

// body {
//     userName: '',
//     password: '',
//     userType: USER_TYPES
// }

export const handleNewUser = async (req, res) => {
    const { userName, password, userType } = req.body;
    if (!userName || !password) {
        return res.status(400).json({
            status: 200,
            message: 'Username and password are required.'
        });
    }

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: userName }).exec();

    //Conflict
    if (duplicate) {
        return res.status(409).json({
            status: 200,
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

        console.log(result);

        res.status(201).json({ 
            status: 200,
            message: `New user ${userName} created! Please Login to continue.` 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });

        res.status(201).json({ 
            status: 200,
            message: err.message
        });
    }
}