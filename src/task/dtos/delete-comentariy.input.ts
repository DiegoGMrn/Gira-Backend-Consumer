import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteComentaryInput{
    @Field()
    idComentary:number;
}
