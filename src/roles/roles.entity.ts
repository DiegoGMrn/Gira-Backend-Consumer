import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Roles {
  @Field(() => Int)
  idRol?: number;

  @Field()
  name: string;

}