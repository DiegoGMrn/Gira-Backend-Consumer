import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProyectoInput{
    @Field()
    name: string;
    
}
