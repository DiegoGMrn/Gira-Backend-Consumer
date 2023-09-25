import { Injectable } from '@nestjs/common';
import { Cats } from './cats.entity'
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatInput } from './dto/create-cat.input';

@Injectable()
export class CatsService {
    constructor(@InjectRepository(Cats) private catsRepository:Repository<Cats>){}
    findAll(): Promise<Cats[]>{
        return this.catsRepository.find()
    }

    createCat(cat: CreateCatInput):Promise<Cats>{
        const newCat = this.catsRepository.create(cat)
        return this.catsRepository.save(newCat)
    }



    @MessagePattern({ cmd: 'createcats'})
    async create(): Promise<string>{
        return 'AGREGADO1';
    }
    


}
