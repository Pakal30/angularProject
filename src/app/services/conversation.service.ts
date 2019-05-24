import { Injectable } from '@angular/core';
import { Conversation } from '../model/Conversation.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  /*conversations: Conversation[] =[{
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
  }]; */
  private conversationsUrl = 'api/conversations';  // URL to web api

  constructor(private http: HttpClient) { }

  /*getConversationById(profilId1:number,profilId2:number){
    let conversation = this.conversation.filter(
      (s) => {
        let res : Conversation;
        res = new Conversation;
        res.id=s.id;
        res.messages=s.messages.filter((m)=>{return m.profilId==profilId1}).filter((n)=>{return n.profilId==profilId2});
        return res;
        }
      
      
    );  
    if (conversation.length==0){
      //create a new conversation
    }
    return conversation[0];
  }*/
  
    /** GET Conversation  */
    getConversation(profilId1:number,profilId2:number): Observable<Conversation> {
      const url = `${this.conversationsUrl}/?profilId1=^${profilId1}$/?profilId2=^${profilId2}$`;
      return this.http.get<Conversation>(url).pipe(
        tap(_ => this.log(`fetched petsProfil id=${profilId1},${profilId2}`)),
        catchError(this.handleError<Conversation>(`getConversation id=${profilId1},${profilId2}`))
      );
    }
    addMessage (conversation: Conversation): Observable<Conversation> {
      return this.http.post<Conversation>(this.conversationsUrl, conversation, httpOptions).pipe(
        tap((newConversation: Conversation) => this.log(`added user w/ id=${newConversation.id}`)),
        catchError(this.handleError<Conversation>('addMessage'))
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
