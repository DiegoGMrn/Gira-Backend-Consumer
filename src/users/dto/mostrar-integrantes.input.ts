import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class MostrarIntegrantes{
    @Field()
    nombreEquipo: string;
}
