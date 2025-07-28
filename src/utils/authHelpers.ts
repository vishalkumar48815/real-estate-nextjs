import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

export async function verifyPassword(pw: string, hash: string){
    return bcrypt.compare(pw, hash)
}

export async function generateToken(payload: object){
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "30d"})
}

export async function verifyToken(token: string){
    return jwt.verify(token, JWT_SECRET)
}