import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

@Entity()
export class Address{
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    @IsString()
    street!: string;
    
    @Column()
    @IsString()
    zipCode!: string;

    @Column()
    @IsString()
    city!: string;

    @Column()
    @IsString()
    state!: string;
    
    @Column()
    @IsString()
    country!: string;

    @Column()
    @IsNotEmpty()
    @IsIn(["Home", "Office", "Other"])
    label!: string //Home,Office

    @IsOptional()
    @Column({type:'boolean' ,default:false})
    isDefault!: boolean;

    @ManyToOne(() => User, (user) => user.addresses,{
        onDelete:'CASCADE'
    } )
    user!: User

    

}