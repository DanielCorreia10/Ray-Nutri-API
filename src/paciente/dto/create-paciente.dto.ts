import { IsString, IsNotEmpty, IsOptional, IsEmail, IsIn, Matches, IsNumberString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer'; // Necessário para garantir que tipos como number funcionem

export class CreatePacienteDto {

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  sobrenome?: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString() 
  @Matches(/^\d{10,11}$/, { message: 'Celular deve ter 10 ou 11 dígitos numéricos.' })
  celular: string;

  @IsString()
  @IsNotEmpty()
  // Espera formato AAAA-MM-DD
  dataNascimento: string; 

  @IsString()
  @IsNotEmpty()
  @IsIn(['masculino', 'feminino'])
  sexo: 'masculino' | 'feminino';

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  primeiraConsulta?: string; 

  @IsString()
  @IsOptional()
  restricaoAlimentar?: string;
}