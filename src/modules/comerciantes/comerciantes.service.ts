import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateComercianteDto } from './dto/create-comerciante.dto';
import { UpdateComercianteDto } from './dto/update-comerciante.dto';
import { FilterComerciantesDto } from './dto/filter-comerciantes.dto';
import { NUMBER_REGISTERS_PER_PAGE } from '../../shared/constans/querys';
import { ComercianteRepository } from '../../database/comerciante/comerciante.repository';
import {
  IComerciante,
  IComerciantePaginated,
} from '../../database/comerciante/comerciante.interface';
import { Estado } from '@prisma/client';
import { PassThrough } from 'stream';
import * as fastcsv from 'fast-csv';

@Injectable()
export class ComerciantesService {
  constructor(private readonly repo: ComercianteRepository) {}

  async getComerciantes(
    filter: FilterComerciantesDto,
  ): Promise<IComerciantePaginated> {
    const { data, total } = await this.repo.findAllPaginated(filter);
    const page = filter.page ?? 1;

    return {
      data,
      meta: {
        total,
        page,
        perPage: NUMBER_REGISTERS_PER_PAGE,
        totalPages: Math.ceil(total / 5),
      },
    };
  }

  async getMunicipios(): Promise<string[]> {
    const municipios = await this.repo.getDistinctMunicipios();
    return municipios;
  }

  async getById(id: number): Promise<IComerciante> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException('Comerciante no encontrado');
    return found;
  }

  async create(dto: CreateComercianteDto, userId: number) {
    return this.repo.create({
      ...dto,
      fechaRegistro: new Date(),
      usuarioActualizacion: { connect: { id: userId } },
    });
  }

  async update(id: number, dto: UpdateComercianteDto, userId: number) {
    await this.getById(id);
    return this.repo.update(id, {
      ...dto,
      usuarioActualizacion: { connect: { id: userId } },
    });
  }

  async updateEstado(id: number, estado: Estado, userId: number) {
    await this.getById(id);
    return this.repo.update(id, {
      estado,
      usuarioActualizacion: { connect: { id: userId } },
    });
  }

  async delete(id: number) {
    await this.getById(id);
    return this.repo.delete(id);
  }

  async generarCsvComerciantesActivos(): Promise<NodeJS.ReadableStream> {
    const comerciantes = await this.repo.findActivosConEstadisticas();
    console.log(comerciantes);
    const rows = comerciantes.map((c) => {
      const cantidadEstablecimientos = c.establecimientos.length;
      const totalIngresos = c.establecimientos.reduce(
        (sum, est) => sum + Number(est.ingresos),
        0,
      );
      const totalEmpleados = c.establecimientos.reduce(
        (sum, est) => sum + est.numeroEmpleados,
        0,
      );

      return {
        nombre: c.nombre,
        municipio: c.municipio,
        telefono: c.telefono || '',
        correoElectronico: c.correoElectronico || '',
        fechaRegistro: c.fechaRegistro.toISOString().split('T')[0],
        estado: c.estado,
        cantidadEstablecimientos,
        totalIngresos: totalIngresos.toFixed(2),
        totalEmpleados,
      };
    });

    const stream = new PassThrough();

    fastcsv
      .write(rows, {
        headers: true,
        delimiter: '|',
      })
      .pipe(stream);

    return stream;
  }
}
