import { promises } from "dns";
import { AppDataSource } from "../config/data-source";
import { LoginPayload, RegisterPayload } from "../dtos/auth.dto";
import { User } from "../entities/userEntity";
import { hashUtil } from "../utils/hash.util";
import { jwtUtils } from "../utils/jwt.utils";

const userRepo = AppDataSource.getRepository(User)

export const registerUserService = async (payload: RegisterPayload): Promise<{message: string; user: Partial<User>}> =>{
    const existingUser =await userRepo.findOne({
      where: {email: payload.email},
    })

    console.log('existingUser:', existingUser);

    if(existingUser){
        throw new Error ('Email already exists')
    }
    const hashedPassword =await hashUtil.hash(payload.password)
    const newUser = userRepo.create({...payload, password: hashedPassword})
    const savedUser = await userRepo.save(newUser)
    const cleanUser = await userRepo.findOne({
      where: { id: savedUser.id },
      select: ['id', 'email', 'firstName', 'role' ],
  });

  return {
      message: "User registered successfully",
      user: cleanUser!,
  };
  }


export const loginUserService = async (payload: LoginPayload): Promise<string> => {
    const validRoles = ['customer', 'admin', 'support'] as const;
    const user = await userRepo.findOne({ where: { email: payload.email }, select: ['password', 'role', 'id', 'role'] });
  
    if (!user) throw new Error('Invalid credentials');
  
    const isMatch = await hashUtil.compare(payload.password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
  
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as 'customer' | 'admin' | 'support'
    };

    if (!validRoles.includes(user.role as any)) {
        throw new Error('Invalid role');
      }
  
    return jwtUtils.jwtSign(tokenPayload);
  };

  export const updateUserService = async(userId: string, payload: User):Promise<User> =>{
    const updatedUser = await userRepo.findOne({
      where: {id: userId}
    })
    if(!updatedUser){
      throw new Error('User not found');
    }
    Object.assign(updatedUser, payload)
    return userRepo.save(updatedUser)
  }