import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolesModule } from './roles/roles.module';
import { MarcaModule } from './marca/marca.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Producto } from './producto/entities/producto.entity';
import { Usuario } from './usuario/entities/usuario.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Producto, Usuario]),
    ProductoModule,
    UsuarioModule,
    RolesModule,
    MarcaModule,
    CategoriaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
