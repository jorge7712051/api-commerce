import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioRepository } from '../database/usuario/usuario.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usuarioRepository: UsuarioRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('api.jwt'),
    });
  }

  async validate(payload: any) {
    const user = await this.usuarioRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Usuario no válido');
    }

    return {
      userId: user.id,
      rol: user.rol,
    };
  }
}
