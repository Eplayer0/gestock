import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  nombre: string;

  @Column('text', {
    unique: true,
  })
  correo: string;

  @Column('text', {
    unique: true,
  })
  contraseña: string;

  @Column('numeric')
  id_role: number;
  @ManyToOne(() => Role, (role) => role.usuario)
  rol: Role;
}
