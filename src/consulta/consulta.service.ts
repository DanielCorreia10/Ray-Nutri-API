import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from './entities/consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private consultaRepository: Repository<Consulta>,
  ) {}

  async create(createConsultaDto: CreateConsultaDto): Promise<Consulta> {
    const imc = this.calcularImc(createConsultaDto.pesoAtual, createConsultaDto.altura);
    const consulta = this.consultaRepository.create({ ...createConsultaDto, imc });
    return this.consultaRepository.save(consulta);
  }

  findAll(): Promise<Consulta[]> {
    // Retorna todas as consultas, incluindo dados do paciente associado
    return this.consultaRepository.find({ relations: ['paciente'], order: { dataConsulta: 'DESC' } });
  }

  async findOne(id: number): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({ 
        where: { idFicha: id }, 
        relations: ['paciente'] 
    });
    if (!consulta) {
        throw new NotFoundException(`Ficha de Consulta com ID ${id} não encontrada.`);
    }
    return consulta;
  }
  
  async update(id: number, updateConsultaDto: UpdateConsultaDto): Promise<Consulta> {
    if (updateConsultaDto.pesoAtual || updateConsultaDto.altura) {
        // Recalcula o IMC se peso ou altura for alterado
        const consultaExistente = await this.findOne(id);
        const peso = updateConsultaDto.pesoAtual || consultaExistente.pesoAtual;
        const altura = updateConsultaDto.altura || consultaExistente.altura;
        updateConsultaDto.imc = this.calcularImc(peso, altura);
    }
    
    await this.consultaRepository.update(id, updateConsultaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.consultaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ficha de Consulta com ID ${id} não encontrada.`);
    }
  }

  // Função utilitária para cálculo de IMC
  private calcularImc(peso: number, altura: number): number {
    return parseFloat((peso / (altura * altura)).toFixed(2));
  }
}