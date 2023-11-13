import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Proyectos } from "./proyectos.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class EquipoProyecto {
  @Field(() => Int)
  id?: number;

  @Field()
  nombreEquipo: string;

  @ManyToOne(() => Proyectos, proyecto => proyecto.equipos)
  @JoinColumn({ name: "idProyecto" })
  proyecto?: Proyectos;

  
}