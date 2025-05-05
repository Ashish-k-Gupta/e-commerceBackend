import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt'
import { User } from "../entities/userEntity";


export class CreateAdminUser20230505000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void>{
        const rawPassword = process.env.ADMIN_PASSWORD || 'WTH@Ashish'; 
        const hashedPassword = await bcrypt.hash(rawPassword, 10)
        
        await queryRunner.manager.insert(User,{

            email: 'theashukumar007@gmail.com',
            password: hashedPassword,
            firstName: 'Ashish',
            lastName: 'Gupta',
            phoneNumber: '7888436679',
            role: 'admin'
        });
        
    }

    public async down(queryRunner: QueryRunner): Promise<void>{
        await queryRunner.manager.delete(User,{
           email:'theashukumar007@gmail.com',
        });
    }
}