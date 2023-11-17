import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class MostrarEquiposProyecto{
    @Field()
    idEquipo: string;

}
