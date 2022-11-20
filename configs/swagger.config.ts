import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MKS Movie')
  .setDescription('The Movie API for MKS')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
