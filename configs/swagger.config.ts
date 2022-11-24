import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MKS Movie')
  .setDescription('This API was made for a development test requested by MKS.')
  .setVersion('1.0')
  .setExternalDoc("Github", "https://github.com/jppradoleal/mks-teste")
  .addBearerAuth()
  .build();
