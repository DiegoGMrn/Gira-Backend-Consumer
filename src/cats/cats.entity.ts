import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Cats{
    @Field((type) => Int)
    id: number;
    @Field()
    nombre: string;
    @Field({nullable:true})
    clave: string;
}