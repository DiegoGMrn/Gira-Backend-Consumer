import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
//import { Cats } from './dtos/cat.dtos';
@Injectable()
export class AppService {

    @MessagePattern({ cmd: 'cats' })
  async getCatName(name: string): Promise<string> {
    return `Cat name ${name}`;
  }
  /*
  @MessagePattern({ cmd: 'allcats' })
  async getAll(cat: Cats): Promise<string> {
    return `Cat data ${cat.name} y ${cat.clave}`;
  }*/

  @MessagePattern({ cmd: 'createcats'})
  async create(): Promise<string>{
    return `AGREGADO3`;
  }





}
