import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskStateInput{
    @Field()
    idTarea:number;
    
    
}
