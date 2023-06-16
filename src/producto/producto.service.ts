import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import { CategoriaService } from 'src/categoria/categoria.service';
import { CreateCategoriaDto } from 'src/categoria/dto/create-categoria.dto';
import { CreateMarcaDto } from 'src/marca/dto/create-marca.dto';
import { MarcaService } from '../marca/marca.service';

@Injectable()
export class ProductoService {
  private readonly logger = new Logger('ProductoService');
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
    private readonly categoriaService: CategoriaService,
    private readonly marcaService: MarcaService,
  ) {}

  async createProduct(
    createProductoDto: CreateProductoDto,
    createCategoriaDto: CreateCategoriaDto,
    createMarcaDto: CreateMarcaDto,
  ): Promise<Producto> {
    const { id_marca, id_categoria = [], ...producDetails } = createProductoDto;

    const categorias: Categoria[] = await this.categoriaRepository.find({
      where: { id: id_categoria[0] },
    });
    let categoria: Categoria = categorias[0];
    if (categorias.length === 0) {
      if (createCategoriaDto && createCategoriaDto.nombre_categoria) {
        const nombreCategoria: string = createCategoriaDto.nombre_categoria;
        const categoriaDto = new CreateCategoriaDto();
        categoriaDto.nombre_categoria = nombreCategoria;
        categoria = await this.categoriaService.create(categoriaDto);
      }
    }

    const marcas: Marca[] = await this.marcaRepository.find({
      where: { id: id_marca[0] },
    });
    let marca: Marca = marcas[0];
    if (marcas.length === 0) {
      if (createMarcaDto && createMarcaDto.nombre) {
        const nombreMarca: string = createMarcaDto.nombre;
        const marcaDto = new CreateMarcaDto();
        marcaDto.nombre = nombreMarca;
        marca = await this.marcaService.create(marcaDto);
      }
    }

    const product = new Producto();
    product.nombre_producto = producDetails.nombre_producto;
    product.descripcion = producDetails.descripcion;
    product.cantidad = producDetails.cantidad;
    if (categoria && categoria.id) {
      product.id_categoria = categoria.id;
    }
    if (marca && marca.id) {
      product.id_marca = marca.id;
    }

    return this.productoRepository.save(product);
  }

  async findAllProducts(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['categoria', 'marca'],
    });
  }

  async findOneProduct(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria', 'marca'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return producto;
  }

  async updateProduct(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOneProduct(id);
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async removeProduct(id: number): Promise<void> {
    const producto = await this.findOneProduct(id);
    await this.productoRepository.remove(producto);
  }
}
