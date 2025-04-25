import jwt from 'jsonwebtoken'
import { JwtPayload } from '../dtos/token.dto'
import { LoginPayload } from '../dtos/auth.dto';

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

export const jwtUtils ={
  jwtSign:  (payload: JwtPayload): string => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'})
  },

  verifyToken: (token: string): JwtPayload | null =>{
    try{
      return jwt.verify(token, SECRET_KEY)  as JwtPayload
    }catch(err){
      return null;
    }
  }
}