import { Field, Int, ObjectType } from "@nestjs/graphql";
import { EquipoProyecto } from "./equiposProyecto.entity";

@ObjectType()
export class Proyectos {
  @Field(() => Int)
  idProyecto?: number;

  @Field()
  name: string;

  @Field()
  correoCreador: string;

  @Field(() => [EquipoProyecto], { nullable: true })
  equipos?: EquipoProyecto[];
}