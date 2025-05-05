import { AppDataSource } from "../config/data-source";
import { UpdateUserPayload } from "../dtos/user.dto";
import { User } from "../entities/userEntity";

const userRepo = AppDataSource.getRepository(User)

export const getUserDetailService = async(userId: string): Promise<User> =>{
    const userDetails = await userRepo.findOne({
        where: {id: userId}
    })
    if(!userDetails){
        throw new Error('User not found');
    }
    return userDetails;
}

export const getUserListService = async():Promise<User[]> =>{
    const users = await userRepo.find({
        select:{
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            role: true
        }
    })
    if (!users.length) {
        throw new Error('No users found');
    }
    return users;
}

export const updateUserDetailService = async(userId: string, payload: UpdateUserPayload):Promise<User> =>{
    const updatedUserDetail = await userRepo.findOne({
        where:{
            id: userId
        }
    })
    if(!updatedUserDetail){
        throw new Error('User not found');

    }

    Object.assign(updatedUserDetail, payload)
    return userRepo.save(updatedUserDetail)
}

export const deleteUserService = async(userId: string):Promise<string> =>{
    const deleteUser =await userRepo.findOneBy({id: userId})

    if(!deleteUser){
        throw new Error(`User with ID ${userId} not found`);
    }
    await userRepo.remove(deleteUser);
    return `User with ID ${userId} has been deleted successfully`;
    
}