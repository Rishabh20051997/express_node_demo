import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../model/User'
import { REFRESH_TOKEN_EXPIRE_TIME, STATUS_CODE, TOKEN_EXPIRE_TIME } from '../common/constant';
import { log } from '../service/loggerService';

// body {
//     userName: '',
//     password: ''
// }

export const handleLogin = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
            status: STATUS_CODE.BAD_REQUEST,
            message: 'Username and password are required.' 
        });  
    } 

    const foundUser = await User.findOne({ username: userName }).exec();

    //Unauthorized
    if (!foundUser) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
            status: STATUS_CODE.BAD_REQUEST,
            message: 'User Name or Password is incorrect' 
        });   
    }

    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: TOKEN_EXPIRE_TIME }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRE_TIME }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        log(result);
        log(roles);

        // Send authorization roles and access token to user
        res.status(STATUS_CODE.SUCCESS).json({ user: {
            userId: foundUser._id,
            userName,
            roles,
        }, 
        accessToken,
        refreshToken
    });

    } else {
        //Unauthorized
        res.status(STATUS_CODE.BAD_REQUEST).json({
            status: STATUS_CODE.BAD_REQUEST,
            message: 'User Name or Password is incorrect' 
        });   

    }
}