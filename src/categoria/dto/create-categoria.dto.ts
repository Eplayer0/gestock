import { IsString, MinLength } from 'class-validator';
export class CreateCategoriaDto {
  @IsString()
  @MinLength(1)
  nombre_categoria: string;
}
