import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";
import { IsIn, IsOptional } from "class-validator";

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