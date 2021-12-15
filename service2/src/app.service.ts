import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserCreatedEvent } from './events/user-created.event';
import { NotificationEvent } from './events/notification.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
  ) {

  }

  async onModuleInit(){
    console.log('onModuleInit')
    await this.client.connect();
  }
  getHello(): string {
    return 'Hello World!';
  }

  accumulate(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.client.send<number>(pattern, payload);
  }

  userPublish() {
    this.client.emit('user_created', new UserCreatedEvent());
  }

  notification():Observable<any> {
    console.log('notification');
    return this.client.emit('notification', new NotificationEvent());
  }
}
