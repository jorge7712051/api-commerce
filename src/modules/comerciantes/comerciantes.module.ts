import { Module } from '@nestjs/common';
import { ComerciantesService } from './comerciantes.service';
import { ComerciantesController } from './comerciantes.controller';
import { DataBaseModule } from '../../database/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [ComerciantesController],
  providers: [ComerciantesService],
})
export class ComerciantesModule {}
