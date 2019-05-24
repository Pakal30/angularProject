import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

  export class InMemoryDataService implements InMemoryDbService {
  
    /*createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
    throw new Error("Method not implemented.");
    */
   createDb(){
      const users = [
        {name:'Will', mail:'will@will.com',password:'123'},
        {name:'Bob', mail:'bwill@will.com',password:'123'}
      ];
      const pets_profils = [
        {id:0,
        name: 'Pepite' ,
        photo : '/assets/images/profils/0/0.jpg',
        proprio : 'george',
        genre : 'male',
        tel :'55-55-55-55',
        description:'Chien...'},
        {id:1,
        name: 'Fifi' ,
        photo : '/assets/images/profils/1/1.jpg',
        proprio : 'Melissa',
        genre : 'male',
        tel :'55-55-55-55',
        description:'Chien...'},
        {id:3,
          name: 'Foo' ,
          photo : '/assets/images/profils/1/1.jpg',
          proprio : 'Mel',
          genre : 'female',
          tel :'55-55-55-55',
          description:'Chien...'},
        {id:4,
            name: 'Pato' ,
            photo : '/assets/images/profils/1/1.jpg',
            proprio : 'Bel',
            genre : 'female',
            tel :'55-55-55-55',
            description:'Chien...'}
      ];
      const conversations =[{
        id:0,
        profilId1: 0,
        profilId2: 1,
        messages: [{
          profilId : 0,
          message : "Bonjour, Comment allez vous?"
        },{
          profilId : 1,
          message : "Bonjour, Bien merci et vous?"
        }]
      }];
      return {users,pets_profils,conversations};
   }
  

  constructor() { }
}
