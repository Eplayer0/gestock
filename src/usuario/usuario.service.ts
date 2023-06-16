import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Role } from 'src/roles/entities/role.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { id_role, ...usuarioDetails } = createUsuarioDto;

    const role = await this.roleRepository.findOne({ where: { id: id_role } });
    if (!role) {
      throw new NotFoundException(`Role with id ${id_role} not found`);
    }
    const nuevoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      rol: role,
    });
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario | undefined> {
    const usuario = await this.findOne(id);
    if (usuario) {
      this.usuarioRepository.merge(usuario, updateUsuarioDto);
      return this.usuarioRepository.save(usuario);
    }
    return undefined;
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const { correo, contraseña } = loginUsuarioDto;

    const user = await this.usuarioRepository.findOne({
      where: { correo: correo },
      select: { correo: true, contraseña: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no validas (email)');
    }
    if (contraseña !== user.contraseña) {
      throw new UnauthorizedException('Credenciales no validas (contraseña)');
    }
    return user;
  }
}
