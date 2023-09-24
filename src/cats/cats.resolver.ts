import { Query, Resolver,Args,Mutation } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cats } from './cats.entity';
import { CreateCatInput } from './dto/create-cat.input';
@Resolver()
export class CatsResolver {
    constructor(private catsService: CatsService){}
    @Query((returns) =>[Cats])
    cats(){
        return this.catsService.findAll();
    }
    /*
    @Mutation()
    createCats(@Args('catInput') catInput:CreateCatInput){
        this.catsService.create();
    }*/
    
    



}
