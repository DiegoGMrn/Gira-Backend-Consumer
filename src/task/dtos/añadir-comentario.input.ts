import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskComentaryInput{
    @Field()
    idProyecto: number;
    @Field()
    idEquipo: number;
    @Field()
    idTarea: number;
    @Field()
    comentario: string;
    
    
}
