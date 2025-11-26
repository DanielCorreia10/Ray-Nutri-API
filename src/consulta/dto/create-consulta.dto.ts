import { IsString, IsNotEmpty, IsOptional, IsNumber, IsIn, IsPositive, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConsultaDto {
  @IsString()
  @IsNotEmpty()
  dataConsulta: string; // AAAA-MM-DD

  @IsString()
  @IsNotEmpty()
  horarioConsulta: string; // HH:MM:SS

  @IsString()
  @IsNotEmpty()
  @IsIn(['primeira', 'retorno', 'avaliacao'])
  tipo: 'primeira' | 'retorno' | 'avaliacao';

  @IsString()
  @IsNotEmpty()
  objetivo: string;

  @IsNumber()
  @IsPositive()
  @Min(0.5)
  @Type(() => Number)
  altura: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  pesoAtual: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  imc?: number;

  @IsString()
  @IsOptional()
  medicacoesUso?: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  idPaciente: number; // Chave estrangeira
}