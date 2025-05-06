import { AppDataSource } from "../config/data-source";
import { LoginPayload, RegisterPayload } from "../dtos/auth.dto";
import { User } from "../entities/userEntity";
import { hashUtil } from "../utils/hash.util";
import { jwtUtils } from "../utils/jwt.utils";

const userRepo = AppDataSource.getRepository(User)

export const loginUserService = async (payload: LoginPayload): Promise<string> => {
    const validRoles = ['customer', 'admin', 'support'] as const;
    const user = await userRepo.findOne({ where: { email: payload.email }, select: ['password', 'role', 'id', 'role'] });
  
    if (!user) throw new Error('Invalid credentials');
  
    const isMatch = await hashUtil.compare(payload.password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
  
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role as 'customer' | 'admin' | 'support'
    };

    if (!validRoles.includes(user.role as any)) {
        throw new Error('Invalid role');
      }
  
    return jwtUtils.jwtSign(tokenPayload);
  };