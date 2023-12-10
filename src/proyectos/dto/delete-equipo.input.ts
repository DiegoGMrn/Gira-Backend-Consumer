import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteEquipoInput{
    @Field()
    idProyecto: number;
    @Field()
    idEquipo: number;
    
}
