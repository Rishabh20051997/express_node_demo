import bcrypt from 'bcrypt'

/**
 * 
 * @param password user password
 * @returns encrypted password
 */
const generateEncryptPassword = async (password): Promise<string> => {
    return await bcrypt.hash(password, 10);
}


/**
 * 
 * @param inputPassword password entered by user
 * @param originalPassword user actual password
 * @returns boolean if password matches or not
 */
const compareByCryptPassword = async (originalPassword, inputPassword): Promise<boolean> => {
    return await bcrypt.compare(originalPassword, inputPassword);
}

export {
    compareByCryptPassword,
    generateEncryptPassword
} 