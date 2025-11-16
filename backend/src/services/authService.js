import { findUserbyUsername, insertUser, checkUsernameExists } from "../models/userModel.js";
import { hasNullValues } from "../utils/validationUtils.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import AppError from "../utils/errors.js";

const registerUser = async (userData) => {
    if (hasNullValues(userData))
        throw new AppError("All fields are required.", 400);

    const users = await checkUsernameExists(userData.username);

    if (users[0].userExists === 1)
        throw new AppError("Username already in use.", 409)

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const result = await insertUser({...userData, password: hashedPassword});

    if (!result || result !== 1) 
        throw new AppError("Registration failed.", 500)
}

const loginUser = async (userData) => {
    if (hasNullValues(userData))
        throw new AppError("All fields are required.", 400)

    const result = await findUserbyUsername(userData.username)
    
    if (result.length === 0) 
        throw new AppError("Account not found.", 404)

    const user = result[0];

    if (!await bcrypt.compare(userData.password, user.password))
        throw new AppError("Invalid password.", 401)
    
    const token = jwt.sign(
        {
            userId: user.user_id,
            username: user.username,
            role: user.role
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    )

    return token;
}



export default { registerUser, loginUser }