/*import { Field, Int, ObjectType } from "@nestjs/graphql";
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
}*/
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EquipoProyecto } from "./equiposProyecto.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Proyectos {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  idProyecto?: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  correoCreador: string;

  @Field(() => [EquipoProyecto], { nullable: true })
  @OneToMany(() => EquipoProyecto, equipo => equipo.proyecto)
  equipos?: EquipoProyecto[];
}