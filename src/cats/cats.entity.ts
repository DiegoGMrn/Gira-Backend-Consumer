import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Cats{
    @PrimaryGeneratedColumn()
    @Field((type)=>Int)
    id: number;
    @Column()
    @Field()
    name: string;
    @Column()
    @Field({nullable:true})
    clave: string;
}