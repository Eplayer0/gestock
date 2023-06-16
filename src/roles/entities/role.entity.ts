import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  nombre: string;
  @OneToOne(() => Usuario, (usuario) => usuario.rol)
  usuario: Usuario;
}
