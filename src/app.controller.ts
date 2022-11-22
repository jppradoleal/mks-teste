import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect()
  redirectToApiDoc() {
    return { url: '/swagger', statusCode: 301 };
  }
}
