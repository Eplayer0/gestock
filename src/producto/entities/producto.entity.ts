import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Marca } from 'src/marca/entities/marca.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  nombre_producto: string;
  @Column('text', {
    nullable: true,
  })
  descripcion: string;

  @Column('text', {
    nullable: true,
  })
  id_categoria: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.producto)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @Column('text', {
    nullable: true,
  })
  id_marca: number;

  @ManyToOne(() => Marca, (marca) => marca.producto)
  @JoinColumn({ name: 'id_marca', referencedColumnName: 'id' })
  marca: Marca;

  @Column('numeric', {
    default: 0,
  })
  cantidad: number;
}
