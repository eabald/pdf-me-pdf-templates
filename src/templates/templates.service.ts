import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TemplateEntity,
  CreateTemplateDto,
  UpdateTemplateDto,
} from '@pdf-me/shared';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(TemplateEntity)
    private templateRepository: Repository<TemplateEntity>,
  ) {}

  async getByUserId(userId: number) {
    const templates = await this.templateRepository.find({
      where: { ownerId: userId },
    });
    this.notFound(!templates.length);
    return templates;
  }

  async getById(templateId: number) {
    const template = await this.templateRepository.findOne(templateId);
    this.notFound(!template);
    return template;
  }

  async create(templateData: CreateTemplateDto) {
    try {
      const newTemplate = await this.templateRepository.create(templateData);
      await this.templateRepository.save(newTemplate);
      return newTemplate;
    } catch (error) {
      throw new RpcException({
        message: 'User with this email does not exist',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }

  async update(updateData: UpdateTemplateDto) {
    return await this.templateRepository.update(
      { ownerId: updateData.ownerId },
      updateData,
    );
  }

  async delete(templateId: number) {
    this.templateRepository.delete(templateId);
  }

  private notFound(condition: boolean) {
    if (condition) {
      throw new RpcException({
        message: 'Templates not found.',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
}
