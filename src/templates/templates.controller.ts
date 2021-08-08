import { Controller } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTemplateDto, UpdateTemplateDto } from '@pdf-me/shared';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @MessagePattern({ cmd: 'templates-get-by-user-id' })
  async getByUser(@Payload() userId: number) {
    return this.templatesService.getByUserId(userId);
  }

  @MessagePattern({ cmd: 'templates-get-by-id' })
  async getById(@Payload() templateId: number) {
    return this.templatesService.getById(templateId);
  }

  @MessagePattern({ cmd: 'templates-create' })
  async create(@Payload() templateData: CreateTemplateDto) {
    return this.templatesService.create(templateData);
  }

  @MessagePattern({ cmd: 'templates-update' })
  async update(@Payload() updateData: UpdateTemplateDto) {
    return this.templatesService.update(updateData);
  }

  @MessagePattern({ cmd: 'templates-delete' })
  async delete(@Payload() templateId: number) {
    return this.templatesService.delete(templateId);
  }
}
