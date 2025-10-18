import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.ApiUrl + '/user/'

  constructor(private http:HttpClient) { }

  login(data:any){
    return this.http.post(this.url + "login",data,{
      headers: new HttpHeaders().set('content-type','application/json')
    })
  }

  signUp(data:any){
    return this.http.post(this.url+'signUp',data,{
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }

  getAll(){
    return this.http.get(this.url+'getAll',{
      headers : new HttpHeaders().set('content-type','application/json')
    } )
  }

  updateSatus(data:any){
    return this.http.patch(this.url+ "updateStatus",data,{
      headers : new HttpHeaders().set("content-type",'application/json')
    })
  }

  deleteUser(id:any){
    return this.http.delete(this.url + "deleted/"+id,{
      headers : new HttpHeaders().set("content-type","application/json")
    })
  }
}
