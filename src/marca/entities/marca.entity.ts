import { Producto } from 'src/producto/entities/producto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Marca {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('text')
  nombre: string;
  @OneToMany(() => Producto, (producto) => producto.marca)
  producto: Producto[];
}
