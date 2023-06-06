import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [ProductoModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
