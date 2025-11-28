import { IsString, IsNotEmpty, IsOptional, IsEmail, IsIn, Matches, IsNumberString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer'; // Necessário para garantir que tipos como number funcionem

export class CreatePacienteDto {

  @IsString()
  @IsOptional()
  nome: string;

  @IsString()
  @IsOptional()
  sobrenome?: string;

  @IsString()
  @IsOptional()
  celular: string;

  @IsString()
  @IsOptional()
  // Espera formato AAAA-MM-DD
  dataNascimento: string;

  @IsString()
  @IsOptional()
  @IsIn(['masculino', 'feminino'])
  sexo: 'masculino' | 'feminino';

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  primeiraConsulta?: string;

  @IsString()
  @IsOptional()
  restricaoAlimentar?: string;
}