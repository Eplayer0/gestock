import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MinLength(1)
  nombre_producto: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  id_categoria?: number[];

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  id_marca?: number[];

  @IsInt()
  @IsPositive()
  cantidad: number;
}
