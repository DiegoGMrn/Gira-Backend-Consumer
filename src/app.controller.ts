import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
//import { Cats } from './dtos/cat.dtos';
@Controller()
export class AppController {
  

  


  @MessagePattern({ cmd: 'cats' })
  async getCatName(name: string): Promise<string> {
    return `Cat name ${name}`;
  }
  /*
  @MessagePattern({ cmd: 'allcats' })
  async getAll(cat: Cats): Promise<string> {
    return `Cat data ${cat.name} y ${cat.clave}`;
  }*/
  /*
  @MessagePattern({ cmd: 'createcats'})
  async create(): Promise<string>{
    return `AGREGADO`;
  }*/
  
  
}
