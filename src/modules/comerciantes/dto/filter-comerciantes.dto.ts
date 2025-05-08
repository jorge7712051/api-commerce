import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { Estado } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterComerciantesDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nombre o razón social (búsqueda parcial)',
    example: 'Gimnasio Fit',
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por fecha exacta de registro (YYYY-MM-DD)',
    example: '2024-12-01',
  })
  @IsOptional()
  @IsDateString()
  fechaRegistro?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por estado del comerciante',
    enum: Estado,
    example: Estado.ACTIVO,
  })
  @IsOptional()
  @IsEnum(Estado)
  estado?: Estado;

  @ApiPropertyOptional({
    description: 'Número de página para paginación (por defecto 1)',
    example: 2,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page?: number;
}

export class UpdateEstadoDto {
  @ApiPropertyOptional({
    description: 'Estado del comerciante',
    example: 'ACTIVO',
  })
  @IsEnum(Estado, {
    message: `Estado inválido. Opciones válidas: ${Object.values(Estado).join(', ')}`,
  })
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  estado: Estado;
}
