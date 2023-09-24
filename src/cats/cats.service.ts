import { Injectable } from '@nestjs/common';
import { Cats } from './cats.entity'
import { MessagePattern } from '@nestjs/microservices';


@Injectable()
export class CatsService {

    findAll(): Cats[]{
        return[
            {
                id:1,
                nombre:'Hello World',
                clave:'example',
            }
        ]
    }
    @MessagePattern({ cmd: 'createcats'})
    async create(): Promise<string>{
        return 'AGREGADO';
    }


}
