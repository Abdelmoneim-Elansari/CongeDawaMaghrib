import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment'

@Injectable({
  providedIn: 'root'
})
export class GestionDeCongesService {
 
  private url = environment.ApiUrl + "/gestionConger/"
  private url2 = environment.ApiUrl

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.url + "getAll",{
      headers : new HttpHeaders().set("content-type","application/json")
    })
  }

  addEmploye(data:any){
    return this.http.post(this.url + "insert",data,{
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }

  uploadFill(data:any){
    return this.http.post(this.url2 + '/fill/uploadFill',data)
  }


  UpdateEmploye(data:any){
    return this.http.patch(this.url,data,{
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }


  updateStatus(id:any){
    return this.http.patch(this.url,id,{
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }
  
  deletedEmploye(id:any){
    return this.http.delete(this.url +'delete/' + id,{
      headers: new HttpHeaders().set('content-type','application/json')
    })
  }

}
