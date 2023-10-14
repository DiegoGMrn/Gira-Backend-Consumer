import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput2{
    @Field()
    claveNueva: string;
}
