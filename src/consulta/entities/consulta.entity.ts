import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity('CONSULTA')
export class Consulta {
  @PrimaryGeneratedColumn({ name: 'id_ficha' })
  idFicha: number;

  @Column({ type: 'date', name: 'data_consulta', nullable: false })
  dataConsulta: string;

  @Column({ type: 'time', name: 'horario_consulta', nullable: false })
  horarioConsulta: string;

  @Column({ type: 'enum', enum: ['primeira', 'retorno', 'avaliacao'], nullable: false })
  tipo: 'primeira' | 'retorno' | 'avaliacao';

  @Column({ length: 45, nullable: false })
  objetivo: string;

  @Column({ type: 'float', nullable: false })
  altura: number;

  @Column({ type: 'float', name: 'peso_atual', nullable: false })
  pesoAtual: number;

  @Column({ type: 'float', nullable: true })
  imc: number | null;

  @Column({ type: 'varchar', length: 255, name: 'medicacoes_uso',  nullable: true })
  medicacoesUso: string | null;

  @Column({ name: 'id_paciente' })
  idPaciente: number;

  @ManyToOne(() => Paciente, paciente => paciente.consultas)
  @JoinColumn({ name: 'id_paciente' })
  paciente: Paciente;
}