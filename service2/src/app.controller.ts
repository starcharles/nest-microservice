import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sum')
  getSum(): Observable<number> {
    return this.appService.accumulate();
  }

  @Get('user')
  getUser() {
    return this.appService.userPublish();
  }
}
