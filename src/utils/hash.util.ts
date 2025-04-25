import bcrypt from 'bcrypt'

export const hashUtil = {
    hash: async (input: string) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(input, salt);
    },
    compare: async (input: string, hashed: string) => {
        return bcrypt.compare(input, hashed);
    }
};
