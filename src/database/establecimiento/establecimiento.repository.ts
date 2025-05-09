import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EstablecimientoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByComercianteId(comercianteId: number) {
    return this.prisma.establecimiento.findMany({
      where: { comercianteId },
    });
  }
}
