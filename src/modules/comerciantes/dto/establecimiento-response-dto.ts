import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class EstablecimientoResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Name' })
  nombre: string;

  @ApiProperty({ example: 1004.5 })
  ingresos: Decimal;

  @ApiProperty({ example: 3 })
  numeroEmpleados: number;

  @ApiProperty({ example: 1 })
  comercianteId: number;
}
