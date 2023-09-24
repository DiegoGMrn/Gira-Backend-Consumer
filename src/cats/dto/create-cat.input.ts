import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCatInput{
    
    @Field()
    nombre: string;
    @Field()
    clave: string;
}
