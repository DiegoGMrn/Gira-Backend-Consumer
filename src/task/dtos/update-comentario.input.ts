import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskComentaryInput{
    @Field()
    idComentary:number;
    @Field()
    comentario: string;
    @Field()
    idTask:number;
    
    
}
