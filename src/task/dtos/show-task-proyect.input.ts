import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class ShowTaskProjectInput{
    @Field()
    idTask: number;
    
    
}
