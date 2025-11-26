import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { ConsultaModule } from './consulta/consulta.module';

@Module({
  imports: [PacienteModule, ConsultaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
