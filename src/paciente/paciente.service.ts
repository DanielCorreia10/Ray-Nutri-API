import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    const paciente = this.pacienteRepository.create(createPacienteDto);
    return this.pacienteRepository.save(paciente);
  }

  // Inclui busca por nome, sobrenome ou e-mail
  findAll(query?: string): Promise<Paciente[]> {
    const queryBuilder = this.pacienteRepository.createQueryBuilder("paciente");
    
    if (query) {
        queryBuilder.where(
            "paciente.nome LIKE :query OR paciente.sobrenome LIKE :query OR paciente.email LIKE :query", 
            { query: `%${query}%` }
        );
    }
    
    return queryBuilder.orderBy('paciente.nome', 'ASC').getMany();
  }
  
  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOneBy({ idPaciente: id });
    if (!paciente) {
        throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
    }
    return paciente;
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto): Promise<Paciente> {
    await this.pacienteRepository.update(id, updatePacienteDto);
    return this.findOne(id); // Retorna o objeto atualizado
  }

  async remove(id: number): Promise<void> {
    const result = await this.pacienteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
    }
  }
}