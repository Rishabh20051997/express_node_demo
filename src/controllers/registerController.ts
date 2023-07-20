import bcrypt from 'bcrypt'
import User from '../model/User'

export const handleNewUser = async (req, res) => {
    const { userName, password, userType } = req.body;
    if (!userName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: userName }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        let userRoles

        if(userType === 'Admin') {
            userRoles = {
                "Admin": 5150,
                "Editor": 1984,
                "User": 2001
            }

        } else if(userType === 'Editor') {
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

        res.status(201).json({ 'success': `New user ${userName} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}