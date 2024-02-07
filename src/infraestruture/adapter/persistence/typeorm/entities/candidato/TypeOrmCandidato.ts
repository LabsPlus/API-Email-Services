import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('candidato')
export class TypeOrmCandidato {
    
    @PrimaryColumn()
    public id: number;

    @Column()
    public nome: string;

    @Column()
    public idArea: number;

    @Column()
    public idEspecialidade: number;
}