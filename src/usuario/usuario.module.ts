import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Usuario } from './entities/usuario.entity';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [TypeOrmModule.forFeature([Usuario, Role]), RolesModule],
})
export class UsuarioModule {}
