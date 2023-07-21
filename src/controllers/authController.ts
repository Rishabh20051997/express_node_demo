import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../model/User'
import { TOKEN_EXPIRE_TIME } from '../common/constant';

// body {
//     userName: '',
//     password: ''
// }

export const handleLogin = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({
            status: 200,
            message: 'Username and password are required.' 
        });  
    } 

    const foundUser = await User.findOne({ username: userName }).exec();

    //Unauthorized
    if (!foundUser) {
        return res.status(400).json({
            status: 200,
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
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Send authorization roles and access token to user
        res.json({ user: {
            userId: foundUser._id,
            userName,
            roles,
        }, 
        accessToken,
        refreshToken
    });

    } else {
        //Unauthorized
        res.status(400).json({
            status: 200,
            message: 'User Name or Password is incorrect' 
        });   

    }
}