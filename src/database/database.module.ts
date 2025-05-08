import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ComercianteRepository } from './comerciante/comerciante.repository';
import { UsuarioRepository } from './usuario/usuario.repository';

@Module({
  providers: [PrismaService, ComercianteRepository, UsuarioRepository],
  exports: [PrismaService, ComercianteRepository, UsuarioRepository],
})
export class DataBaseModule {}
