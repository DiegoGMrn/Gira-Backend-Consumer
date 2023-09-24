import { Column, Entity} from "typeorm"

@Entity()
export class Cats{
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    clave: string

}