import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepositorio: Repository<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const { nombre } = createMarcaDto;

    const marcaExistente = await this.marcaRepositorio.findOne({
      where: { nombre: ILike(nombre) },
    });

    if (marcaExistente) {
      return marcaExistente;
    } else {
      const marca = new Marca();
      marca.nombre = nombre;

      return this.marcaRepositorio.save(marca);
    }
  }

  findAll(): Promise<Marca[]> {
    return this.marcaRepositorio.find();
  }

  async findOne(id: number): Promise<Marca> {
    const marca = await this.marcaRepositorio.findOne({ where: { id: id } });
    if (!marca) {
      throw new NotFoundException(`Marca with ID ${id} not found`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto): Promise<Marca> {
    const marca = await this.findOne(id);
    Object.assign(marca, updateMarcaDto);
    return this.marcaRepositorio.save(marca);
  }

  async remove(id: number): Promise<void> {
    const marca = await this.findOne(id);
    await this.marcaRepositorio.remove(marca);
  }
}
