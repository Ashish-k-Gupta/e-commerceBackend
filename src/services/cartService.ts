import { AppDataSource } from "../config/data-source";
import { Cart } from "../entities/cartEntity";
import { CartItem } from "../entities/cartItemEntity";
import { Product } from "../entities/productEntity";
import { User } from "../entities/userEntity";

const cartRepo = AppDataSource.getRepository(Cart);
const cartItemRepo = AppDataSource.getRepository(CartItem);
const userRepo = AppDataSource.getRepository(User)
const productRepo = AppDataSource.getRepository(Product)

export const getOrCreateCart = async (userId: string): Promise<Cart>=>{
    let cart = await cartRepo.findOne({
        where: {user:{id: userId}},
        relations: ['cartItems', 'cartItems.product']
    })

    if(!cart){
        const user = await userRepo.findOneByOrFail({id: userId})
        cart = cartRepo.create({user, cartItems: []})
        await cartRepo.save(cart)
    }
    return cart;
};

export const addItemToCart = async(userId: string, productId: string, quantity: number):Promise<Cart> =>{
    const cart = await getOrCreateCart(userId)
    const product = await productRepo.findOneByOrFail({id: productId})

    const existingItem = cart.cartItems.find(item => item.product.id === productId)
    if(existingItem){
        existingItem.quantity += quantity;
        await cartItemRepo.save(existingItem)
    }else{
        const newItem = cartItemRepo.create({cart, product, quantity});
        await cartItemRepo.save(newItem)
    }
    return getOrCreateCart(userId)
};

export const updatedCartItemQuanityService = async(userId: string, productId: string, quantity: number): Promise<Cart> =>{
    const cart = await getOrCreateCart(userId)
    const item = cart.cartItems.find(item => item.product.id === productId)

    if(!item){
        throw new Error("item not found in cart")
    }
    if(quantity <= 0){
        await cartItemRepo.remove(item);
    }else{
        item.quantity = quantity;
        await cartItemRepo.save(item)
    }

    return getOrCreateCart(userId)
};

export const removeItemFromCartService = async(userId: string, productId: string): Promise<Cart> =>{
    const cart = await getOrCreateCart(userId)
    const item = await cart.cartItems.find(item => item.product.id === productId)

    if(item){
        await cartItemRepo.remove(item);
    }
    return getOrCreateCart(userId)
};

export const clearCartService = async(userId: string): Promise<Cart> =>{
    const cart = await getOrCreateCart(userId)
    await cartItemRepo.remove(cart.cartItems)
    return getOrCreateCart(userId)
};
