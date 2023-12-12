import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskDescripcionInput{
    @Field()
    idTask:number;
    @Field()
    descripcion: string;
    
    
}
