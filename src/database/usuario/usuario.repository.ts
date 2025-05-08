import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
@Injectable()
export class UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCorreo(correo: string) {
    return this.prisma.usuario.findUnique({
      where: { correoElectronico: correo },
    });
  }

  async findById(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }
}
