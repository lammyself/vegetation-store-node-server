import { Injectable } from '@nestjs/common';

@Injectable()
export class VPService {
  getHello(): string {
    return 'Hello World!';
  }
}
