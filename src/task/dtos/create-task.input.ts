import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput{
    @Field()
    name: string;
    @Field()
    fechaV: string;
    @Field()
    idEquipo: number;
    @Field()
    idProyecto: number;
    
    
}
