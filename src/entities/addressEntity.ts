import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";
import { IsOptional } from "class-validator";

@Entity()
export class Address{
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    street!: string;
    
    @Column()
    zipcode!: string;

    @Column()
    city!: string;

    @Column()
    state!: string;
    
    @Column()
    country!: string;

    @Column()
    label!: string //Home,Office

    @IsOptional()
    @Column({default:false})
    isDefault!: boolean;

    @ManyToOne(() => User, (user) => user.address )
    user!: User

}