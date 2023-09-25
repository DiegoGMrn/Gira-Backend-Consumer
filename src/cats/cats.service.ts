import { Injectable, Inject } from '@nestjs/common';
import { Cats } from './cats.entity'
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatInput } from './dto/create-cat.input';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class CatsService {
    constructor(@Inject('CATS_SERVICE') private readonly client: ClientProxy,@InjectRepository(Cats) private catsRepository:Repository<Cats>){}
    findAll(): Promise<Cats[]>{
        return this.catsRepository.find()
    }
    /*
    async createCat(cat: CreateCatInput):Promise<Cats>{
        const newCat = this.catsRepository.create(cat)
        
        await this.catsRepository.save(newCat)
        await this.client.emit('new_cat_created', newCat);
        return newCat;
    }*/
    
    async createCat(cat: CreateCatInput):Promise<void>{
        
        await this.client.emit('new_cat_created', cat).toPromise();
        
    }



    @MessagePattern({ cmd: 'createcats'})
    async create(): Promise<string>{
        return 'AGREGADO1';
    }
    


}
