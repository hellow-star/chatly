import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // prevent XSS attacksL cross-site scripting
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV === "production", // set to true in production
    })
    return token;
}