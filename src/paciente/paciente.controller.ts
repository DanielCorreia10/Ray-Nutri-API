import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes') 
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.pacienteService.findAll(search);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacienteService.update(+id, updatePacienteDto);
  }
z
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.pacienteService.remove(+id);
  }
}