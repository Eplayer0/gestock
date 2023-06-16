import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepositorio: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const { nombre_categoria } = createCategoriaDto;

    const categoriaExistente = await this.categoriaRepositorio.findOne({
      where: { nombre_categoria: ILike(nombre_categoria) },
    });

    if (categoriaExistente) {
      return categoriaExistente;
    } else {
      const categoria = new Categoria();
      categoria.nombre_categoria = nombre_categoria;

      return this.categoriaRepositorio.save(categoria);
    }
  }

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepositorio.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepositorio.findOne({
      where: { id: id },
    });
    if (!categoria) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
    }
    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return this.categoriaRepositorio.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.categoriaRepositorio.remove(categoria);
  }

  async findByName(nombre: string): Promise<Categoria | undefined> {
    return this.categoriaRepositorio.findOne({
      where: { nombre_categoria: nombre },
    });
  }
}
