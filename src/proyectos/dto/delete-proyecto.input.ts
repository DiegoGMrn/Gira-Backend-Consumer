import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteProyectoInput{
    @Field()
    name: string;
    
}
