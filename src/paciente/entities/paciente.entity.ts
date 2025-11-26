import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Consulta } from '../../consulta/entities/consulta.entity';

@Entity('PACIENTE')
export class Paciente {
  @PrimaryGeneratedColumn({ name: 'id_paciente' })
  idPaciente: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  sobrenome: string | null;

  @Column({ type: 'varchar', length: 11, nullable: false })
  celular: string;

  @Column({ type: 'date', name: 'data_nascimento', nullable: false })
  dataNascimento: string; 

  @Column({ type: 'enum', enum: ['masculino', 'feminino'], nullable: false })
  sexo: 'masculino' | 'feminino';

  @Column({ type: 'varchar', length: 45, nullable: true })
  email: string | null;

  @Column({ type: 'date', name: 'primeira_consulta', nullable: true })
  primeiraConsulta: string | null;

  @Column({ type: 'varchar',  length: 255, name: 'restricao_alimentar', nullable: true })
  restricaoAlimentar: string | null;

  @OneToMany(() => Consulta, consulta => consulta.paciente)
  consultas: Consulta[];
}