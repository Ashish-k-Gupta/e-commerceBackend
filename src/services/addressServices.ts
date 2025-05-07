import { AppDataSource } from "../config/data-source";
import { CreateAddressPayload, UpdateAddressPayload } from "../dtos/address.dto";
import { Address } from "../entities/addressEntity";
import { User } from "../entities/userEntity";

const addressRepo = AppDataSource.getRepository(Address)
const userRepo = AppDataSource.getRepository(User);

export const createAddressService = async (userId: string , payload: CreateAddressPayload): Promise<Address> =>{
    const user = await userRepo.findOne({where: {id: userId}})

    if(!user){
        throw new Error("User not found");
    }

    const address = addressRepo.create({...payload, user});

    return addressRepo.save(address)
   
}

export const getAddressesService = async (userId: string): Promise<Address[]> =>{
    return addressRepo.find({
        where: { user: { id: userId } },
    });
     
}

export const getAddressByIdService = async(userId: string, addressId: string): Promise<Address | null> =>{
    const address =await addressRepo.findOne({
        where:{
            user: {id: userId},
            id: addressId
        },
        relations:['user']
    })

    if (!address) {
        return null;
    }
    return address;

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

export const updateAddressService = async(addressId: string, userId: string, payload: UpdateAddressPayload):Promise<Address> =>{
    const address = await addressRepo.findOne({
        where: {
            id: addressId,
            user: {id: userId}
        }
    })

    if(!address){
        throw new Error('Address not found or not owned by user');
    }

    Object.assign(address, payload)
    return addressRepo.save(address);
}