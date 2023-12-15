import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskNameInput{
    @Field()
    idTarea:number;
    @Field()
    nuevoNombre:string;
    
}
