export interface JwtPayload{
    userId: string,
    email: string,
    role: 'customer'| 'admin' | 'support'
}