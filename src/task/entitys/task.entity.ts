import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity ,OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import { TaskComentary } from './taskComentary.entity';

@Entity()
@ObjectType()
export class Task{
    
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    idTask?: number;

    @Column()
    @Field()
    name?: string;

    @Column()
    @Field()
    fechaV?: string;

    @Column()
    @Field()
    correoCreador?: string;

    @Column()
    @Field()
    idEquipo: number;

    @Column()
    @Field()
    idProyecto: number;

    @Column({ nullable: true }) 
    @Field({ nullable: true }) 
    descripcion?: string | null;

    
}