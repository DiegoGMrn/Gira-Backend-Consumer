import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteEquipoProyectoInput{
    @Field()
    idProyecto: number;
    @Field()
    idEquipo: number;
    
}
