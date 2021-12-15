import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';

@Controller('math')
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log('service1 is called')
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern('notification')
  getNotifications(@Payload() data: number[], @Ctx() context: RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    console.log(context);
    console.log(data);
    return data;
  }

  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    console.log(data);
    console.log('handleUserCreated');
  }
}
