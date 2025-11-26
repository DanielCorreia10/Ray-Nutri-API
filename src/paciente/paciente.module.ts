import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // [1] Importação necessária
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { Paciente } from './entities/paciente.entity'; // [2] Importação da Entidade

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])], 
  controllers: [PacienteController],
  providers: [PacienteService],
})
export class PacienteModule {}