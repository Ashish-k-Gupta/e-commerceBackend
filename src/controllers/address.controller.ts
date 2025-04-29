import { Request, Response, NextFunction} from "express";
import { createAddressService, getAddressesService, deleteAddressService, updateAddressService, getAddressByIdService } from "../services/addressServices";


export const createAddress = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        const userId = (req as any).user.userId;
        const address = await createAddressService(userId, req.body )
        res.status(201).json({ message: 'Address created successfully', address });
    }catch(err){
        res.status(400).json({ message: 'Address creation failed', error: err instanceof Error ? err.message : 'Unknown error' });
    }
}

export const getAddresses = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const addresses = await getAddressesService(userId);
        res.status(200).json({ addresses });
    } catch (err) {
        res.status(400).json({ message: 'Failed to fetch addresses', error: err instanceof Error ? err.message : 'Unknown error' });
    }
};

export const getAddressById = async (req: Request, res: Response) =>{
    try{
        const userId = (req as any).user.userId;
        const addressId = req.params.id;

        const address = await getAddressByIdService(userId, addressId);

        if(!address){
            return res.status(404).json({message: "Address not found"})
        }

    }catch(err){


    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const addressId = req.params.id;
        await deleteAddressService(addressId, userId);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete address', error: err instanceof Error ? err.message : 'Unknown error' });
    }
};

export const updateAddress = async (req: Request, res: Response) =>{
    try{
        const userId = (req as any).user.userId;
        const addressId = req.params.id;
        const updatedAddress = await updateAddressService(addressId, userId, req.body)
        res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
    }catch(err){
        res.status(400).json({message: "Failed to udpated address", error: err instanceof Error ? err.message: "Unknown error"})
    }
}
