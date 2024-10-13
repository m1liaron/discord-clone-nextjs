import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default function createJWToken(id: string, email: string) {
    if(JWT_SECRET) {
        return jwt.sign(
            {id, email},
            JWT_SECRET,
            { expiresIn: '30d' }
        )
    } else {
        console.error('JWT Secret not available');
    }
}