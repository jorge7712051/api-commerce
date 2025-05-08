import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponseDto } from './auth.dto';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('login')
  async login(@Body() { email, password }: AuthDto): Promise<AuthResponseDto> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    return this.authService.login(user);
  }
}
