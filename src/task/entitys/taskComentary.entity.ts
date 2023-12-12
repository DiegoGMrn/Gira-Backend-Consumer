import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,JoinColumn,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import { Task } from './task.entity';

@Entity()
@ObjectType()
export class TaskComentary{
    
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id?: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    comentario: string;
    
    
}