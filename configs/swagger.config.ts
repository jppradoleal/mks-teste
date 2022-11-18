import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MKS Bookstore')
  .setDescription('The Bookstore API for MKS')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
