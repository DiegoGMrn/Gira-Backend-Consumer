import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class AgregarRol{
    @Field()
    correoIntegrante: string;
    @Field()
    equipoId: number;
    @Field()
    idRol: number;
}
