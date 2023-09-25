import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCatInput{
    
    @Field()
    name: string;
    @Field()
    clave: string;
}
