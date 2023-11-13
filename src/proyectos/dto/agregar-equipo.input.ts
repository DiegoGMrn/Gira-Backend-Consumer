import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class AgregarEquipo{
    @Field()
    idProyecto: number;
    @Field()
    idEquipo: number;
}
