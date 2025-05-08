import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/service-configuration';
import { AuthModule } from './auth/auth.module';
import { ComerciantesModule } from './modules/comerciantes/comerciantes.module';
import { DataBaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [EnvConfiguration],
    }),
    AuthModule,
    ComerciantesModule,
    DataBaseModule,
  ],
  providers: [],
})
export class AppModule {}
