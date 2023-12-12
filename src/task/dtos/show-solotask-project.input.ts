import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class ShowSoloTaskProjectInput{
    @Field()
    idProyecto: number;
    
    
}
