import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from '@eabald/pdf-me-shared';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity])],
  providers: [TemplatesService],
  controllers: [TemplatesController],
})
export class TemplatesModule {}
