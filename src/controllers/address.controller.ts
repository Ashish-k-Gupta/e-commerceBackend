import { Request, Response, NextFunction } from "express";
import {
  createAddressService,
  getAddressesService,
  deleteAddressService,
  updateAddressService,
  getAddressByIdService,
} from "../services/addressService";

export const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    if(!userId){
       res.status(401).json({message: 'Unauthorized: Missing user ID'})
    }
    const address = await createAddressService(userId, req.body);
    res.status(201).json({ message: "Address created successfully", address });
  } catch (err) {
    next(err)
  }
};

export const getAddresses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.user!.id;
    const addresses = await getAddressesService(userId);
    res.status(200).json({ addresses });
  } catch (err) {
   next(err)
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;
    const addressId = req?.params?.id;
    console.log(userId)
    console.log(addressId)

    if (!userId || !addressId) {
      res.status(400).json({ message: "Missing userId or addressId" });
      return;
    }

    const address = await getAddressByIdService(userId, addressId);

    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    res.status(200).json(address);
  } catch (err) {
    res.status(400).json({
      message: "Failed to get address",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const userId = req?.user!.id;
    if(!userId){
      res.status(401).json({message: 'Unauthorized: Missing user ID'})
    }
    const addressId = req.params.id;
    if(!addressId){
      res.status(400).json({message: 'Address id do not exits'})
    }
    await deleteAddressService(userId, addressId );
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    res.status(400).json({
      message: "Failed to delete address",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;
    const addressId = req.params.id;
    const updatedAddress = await updateAddressService(
      addressId,
      req.user!.id,
      req.body,
    );
    res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to udpated address",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
