import { Injectable } from '@nestjs/common';
import { Estado, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { IFilterComerciantes } from './comerciante.interface';
import { NUMBER_REGISTERS_PER_PAGE } from '../../shared/constans/querys';

@Injectable()
export class ComercianteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPaginated(filter: IFilterComerciantes) {
    const { nombre, estado, fechaRegistro, page = 1 } = filter;
    const where: Prisma.ComercianteWhereInput = {};

    if (nombre) where.nombre = { contains: nombre, mode: 'insensitive' };
    if (estado) where.estado = estado;
    if (fechaRegistro) {
      const date = new Date(fechaRegistro);
      if (!isNaN(date.getTime())) {
        where.fechaRegistro = { equals: date };
      }
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.comerciante.findMany({
        where,
        skip: (page - 1) * NUMBER_REGISTERS_PER_PAGE,
        take: 5,
        orderBy: { id: 'asc' },
      }),
      this.prisma.comerciante.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: number) {
    return this.prisma.comerciante.findUnique({ where: { id } });
  }

  async create(data: Prisma.ComercianteCreateInput) {
    return this.prisma.comerciante.create({ data });
  }

  async update(id: number, data: Prisma.ComercianteUpdateInput) {
    return this.prisma.comerciante.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.comerciante.delete({ where: { id } });
  }

  async getDistinctMunicipios() {
    const result = await this.prisma.comerciante.findMany({
      distinct: ['municipio'],
      select: { municipio: true },
    });
    return result.map((r) => r.municipio);
  }

  async findActivosConEstadisticas() {
    return this.prisma.comerciante.findMany({
      where: { estado: Estado.ACTIVO },
      include: {
        establecimientos: true,
      },
    });
  }
}
