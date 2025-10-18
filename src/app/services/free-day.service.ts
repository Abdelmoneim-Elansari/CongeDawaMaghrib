import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FreeDayService {

  private url:string = environment.ApiUrl + '/freeDay'
  constructor(private http:HttpClient) { }


  addFreeDay(data:any){
    return this.http.post(this.url + '/addFreeDay',data,{
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }

  getAll(){
    return this.http.get(this.url + "/getAll",{
      headers : new HttpHeaders().set("content-type","application/json")
    })
  }

  delete(id:any){
    return this.http.delete(this.url + "/delete/"+id, {
      headers : new HttpHeaders().set("content-type","application/json")
    })
  }
}
