import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { CreateMarcaDto } from 'src/marca/dto/create-marca.dto';
import { CreateCategoriaDto } from 'src/categoria/dto/create-categoria.dto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(
    @Body() createProductoDto: CreateProductoDto,
    createMarcaDto: CreateMarcaDto,
    createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.productoService.createProduct(
      createProductoDto,
      createCategoriaDto,
      createMarcaDto,
    );
  }

  @Get()
  findAll() {
    return this.productoService.findAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOneProduct(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productoService.updateProduct(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.removeProduct(+id);
  }
}
