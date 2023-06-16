import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  @MinLength(1)
  correo: string;

  @IsString()
  @MinLength(1)
  contraseña: string;
}
