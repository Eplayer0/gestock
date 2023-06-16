import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const nuevoRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(nuevoRole);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role | undefined> {
    const role = await this.findOne(id);
    if (role) {
      this.roleRepository.merge(role, updateRoleDto);
      return this.roleRepository.save(role);
    }
    return undefined;
  }

  async remove(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
  }
}
