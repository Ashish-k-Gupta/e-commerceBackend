import { Request } from "express";
import { AppDataSource } from "../config/data-source";
import { CreateAddressPayload } from "../dtos/address.dto";
import { Address } from "../entities/addressEntity";
import { User } from "../entities/userEntity";

const addressRepo = AppDataSource.getRepository(Address)
const userRepo = AppDataSource.getRepository(User);

export const createAddressService = async (userId: string , payload: CreateAddressPayload): Promise<Address> =>{
    const user = await userRepo.findOne({where: {id: userId}})

    if(!user){
        throw new Error("User not found");
    }

    const address = addressRepo.create({...payload, user: user});

    return addressRepo.save(address)
   
}

export const getAddressesService = async (userId: string): Promise<Address[]> =>{
    return addressRepo.find({
        where: { user: { id: userId } },
    });
     
}


export const deleteAddressService = async(addressId: string, userId: string): Promise<void> =>{
    const address = await addressRepo.findOne({
        where: {
            id: addressId,
            user: {id: userId}
        }
    })

    if(!address){
        throw new Error('Address not found or not owned by user');
    }

    await addressRepo.remove(address);
}