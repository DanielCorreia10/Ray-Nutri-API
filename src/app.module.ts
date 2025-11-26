import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { PacienteModule } from './paciente/paciente.module'; 
import { ConsultaModule } from './consulta/consulta.module'; 
import { getTypeOrmConfig } from './config/typeorm.config'; 


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Configuração assíncrona do TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => getTypeOrmConfig(configService), 
      inject: [ConfigService], 
    }),
    
    PacienteModule, 
    ConsultaModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}