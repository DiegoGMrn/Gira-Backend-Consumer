import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";


@ObjectType()
@Entity()
export class Roles {
  @Field(() => Int)
  idRol?: number;

  @Field()
  name: string;

}