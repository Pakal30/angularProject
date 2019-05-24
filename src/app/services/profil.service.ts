import { Injectable } from '@angular/core';
import { PetsProfil } from '../model/PetsProfil.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
 /* profils: PetsProfil[]= [
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
    description:'Chien...'}
  ];*/
  private petsProfilUrl = 'api/pets_profils';  // URL to web api

  constructor(private http: HttpClient) { }

  /*getProfilById(id:number){
    const petProfil = this.profils.find(
      (s) => {
        return s.id === id;
      }
    );  
    return petProfil;
  }
  
  getProfils(){
    return this.profils;
  }*/
  getProfils (): Observable<PetsProfil[]> {
    return this.http.get<PetsProfil[]>(this.petsProfilUrl)
      .pipe(
        tap(_ => this.log('fetched PetsProfil')),
        catchError(this.handleError<PetsProfil[]>('getProfils', []))
      );
  }

  /* GET PetsProfil whose name contains search term */
  getProfilsByGenre(genre: string): Observable<PetsProfil[]> {
    return this.http.get<PetsProfil[]>(`${this.petsProfilUrl}/?genre=^${genre}$`).pipe(
      tap(_ => this.log(`found pets profil matching "${genre}"`)),
      catchError(this.handleError<PetsProfil[]>('getProfilsByGenre', []))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getProfil(id: number): Observable<PetsProfil> {
    const url = `${this.petsProfilUrl}/${id}`;
    return this.http.get<PetsProfil>(url).pipe(
      tap(_ => this.log(`fetched petsProfil id=${id}`)),
      catchError(this.handleError<PetsProfil>(`getProfil id=${id}`))
    );
  }
  
  /** POST: add a new PetsProfil to the server */
  addPetsProfil (petsProfil: PetsProfil): Observable<PetsProfil> {
    return this.http.post<PetsProfil>(this.petsProfilUrl, petsProfil, httpOptions).pipe(
      tap((newPetsProfil: PetsProfil) => this.log(`added user w/ id=${newPetsProfil.id}`)),
      catchError(this.handleError<PetsProfil>('addPetsProfil'))
    );
  }

  
  /** DELETE: delete the PetsProfil from the server */
  deletePetsProfil (petsProfil: PetsProfil | number): Observable<PetsProfil> {
    const id = typeof petsProfil === 'number' ? petsProfil : petsProfil.id;
    const url = `${this.petsProfilUrl}/${id}`;
 
    return this.http.delete<PetsProfil>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted PetsProfil id=${id}`)),
      catchError(this.handleError<PetsProfil>('deletePetsProfil'))
    );
  }
 
  /** PUT: update the PetsProfil on the server */
  updatePetsProfil (petsProfil: PetsProfil): Observable<any> {
    return this.http.put(this.petsProfilUrl, petsProfil, httpOptions).pipe(
      tap(_ => this.log(`updated PetsProfil id=${petsProfil.id}`)),
      catchError(this.handleError<any>('updatePetsProfil'))
    );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(log:string){
    console.info(log);
  }
}
