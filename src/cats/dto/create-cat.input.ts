import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCatInput{
    
    @Field({nullable:true})
    name?: string;
    @Field({nullable:true})
    clave?: string;
}
