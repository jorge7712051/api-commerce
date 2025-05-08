import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsuarioRepository } from '../database/usuario/usuario.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usuarioRepository.findByCorreo(email);
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.contrasena);
    if (!isValid) return null;
    return user;
  }

  async login(user: any) {
    const payload = { user: user.email, rol: user.rol, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
