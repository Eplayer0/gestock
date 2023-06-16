import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsEmail()
  @MinLength(1)
  correo: string;

  @IsString()
  @MinLength(1)
  contraseña: string;

  @IsInt()
  @IsPositive()
  id_role: number;
}
