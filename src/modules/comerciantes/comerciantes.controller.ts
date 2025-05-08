import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { ComerciantesService } from './comerciantes.service';
import { CreateComercianteDto } from './dto/create-comerciante.dto';
import { UpdateComercianteDto } from './dto/update-comerciante.dto';
import {
  FilterComerciantesDto,
  UpdateEstadoDto,
} from './dto/filter-comerciantes.dto';
import {
  IComerciante,
  IComerciantePaginated,
} from '../../database/comerciante/comerciante.interface';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../auth/current-user.decorator';
import { Roles } from '../../auth/roles.decorator';
import { Response } from 'express';

@ApiTags('Comerciantes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comerciantes')
export class ComerciantesController {
  constructor(private readonly service: ComerciantesService) {}

  @Get('municipios')
  @ApiOperation({ summary: 'Listar municipios únicos' })
  @ApiResponse({ status: 200, description: 'Lista de municipios' })
  async getMunicipios(): Promise<string[]> {
    return this.service.getMunicipios();
  }

  @ApiOperation({
    summary: 'Obtener lista paginada de comerciantes con filtros',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada' })
  @Get()
  async getAll(
    @Query() filter: FilterComerciantesDto,
  ): Promise<IComerciantePaginated> {
    try {
      return this.service.getComerciantes(filter);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Roles('ADMIN')
  @Get('exportar')
  @ApiOperation({
    summary: 'Exportar comerciantes activos a archivo .csv (solo ADMIN)',
  })
  @ApiResponse({ status: 200, description: 'Archivo generado correctamente' })
  async exportarCsv(@Res() res: Response) {
    const stream = await this.service.generarCsvComerciantesActivos();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="comerciantes_activos.csv"',
    );

    stream.pipe(res);
  }

  @ApiOperation({ summary: 'Obtener comerciante por ID' })
  @ApiResponse({ status: 200, description: 'Comerciante encontrado' })
  @ApiResponse({ status: 404, description: 'Comerciante no encontrado' })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<IComerciante> {
    try {
      const comerciante = await this.service.getById(id);

      return comerciante;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({ summary: 'Crear comerciante' })
  @ApiResponse({ status: 201, description: 'Comerciante creado' })
  @Post()
  async create(@Body() dto: CreateComercianteDto, @CurrentUser() user: any) {
    return this.service.create(dto, user.userId);
  }

  @ApiOperation({ summary: 'Actualizar comerciante' })
  @ApiResponse({ status: 200, description: 'Comerciante actualizado' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateComercianteDto,
    @CurrentUser() user: any,
  ): Promise<IComerciante> {
    return this.service.update(id, dto, user.userId);
  }

  @Patch(':id/estado')
  async updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() { estado }: UpdateEstadoDto,
    @CurrentUser()
    user: any,
  ): Promise<IComerciante> {
    return this.service.updateEstado(id, estado, user.userId);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<IComerciante> {
    return this.service.delete(id);
  }
}
