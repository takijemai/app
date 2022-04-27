import { Injectable } from '@angular/core';
import { DbService } from '../services/db.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieResolverService   implements Resolve<any>{

  constructor(private dbService: DbService) {
  }


    resolve(){
      return this.dbService.getMovies();
  }

}
