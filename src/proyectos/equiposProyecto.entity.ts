/*import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
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

  
}*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Proyectos } from "./proyectos.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class EquipoProyecto {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  idEquipo: number;

  @Field(() => Proyectos)
  @ManyToOne(() => Proyectos, proyecto => proyecto.equipos)
  @JoinColumn({ name: "idProyecto" })
  proyecto?: Proyectos;
}