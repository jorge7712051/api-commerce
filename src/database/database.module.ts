import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ComercianteRepository } from './comerciante/comerciante.repository';
import { UsuarioRepository } from './usuario/usuario.repository';
import { EstablecimientoRepository } from './establecimiento/establecimiento.repository';

@Module({
  providers: [
    PrismaService,
    ComercianteRepository,
    UsuarioRepository,
    EstablecimientoRepository,
  ],
  exports: [
    PrismaService,
    ComercianteRepository,
    UsuarioRepository,
    EstablecimientoRepository,
  ],
})
export class DataBaseModule {}
