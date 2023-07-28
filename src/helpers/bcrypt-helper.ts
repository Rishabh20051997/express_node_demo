import bcrypt from 'bcrypt'

const generateEncryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const compareByCryptPassword = async (originalPassword, inputPassword) => {
    return await bcrypt.compare(originalPassword, inputPassword);
}

export {
    compareByCryptPassword,
    generateEncryptPassword
} 