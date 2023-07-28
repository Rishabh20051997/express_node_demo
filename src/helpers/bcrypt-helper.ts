import bcrypt from 'bcrypt'

const generateEncryptPassword = async (password): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

const compareByCryptPassword = async (originalPassword, inputPassword): Promise<boolean> => {
    return await bcrypt.compare(originalPassword, inputPassword);
}

export {
    compareByCryptPassword,
    generateEncryptPassword
} 