import { Producto } from 'src/producto/entities/producto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  nombre_categoria: string;
  @OneToMany(() => Producto, (producto) => producto.categoria)
  producto: Producto[];
}
