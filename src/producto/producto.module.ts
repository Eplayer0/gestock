import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { MarcaModule } from 'src/marca/marca.module';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService],
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria, Marca]),
    CategoriaModule,
    MarcaModule,
  ],
})
export class ProductoModule {}
