import {
  IsEmail,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Estado } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComercianteDto {
  @ApiProperty({ example: 'Gimnasio FitLife' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Bogotá' })
  @IsNotEmpty()
  @IsString()
  municipio: string;

  @ApiPropertyOptional({ example: '3123456789' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: 'correo@ejemplo.com' })
  @IsOptional()
  @IsEmail()
  correoElectronico?: string;

  @ApiProperty({ enum: Estado })
  @IsEnum(Estado)
  estado: Estado;
}
