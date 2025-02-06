import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveTimeService {
   url = environment.ApiUrl + '/time/'
  constructor(private Http:HttpClient) { }

  getAll(idE:any) {
    return this.Http.get(this.url + 'getAll/'+ idE)
  }

  addTime(data:any){
    console.log('ok --')
    return this.Http.post(this.url + 'insert',data ,{
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }

  updateTime(data:any){
    return this.Http.patch(this.url + 'updateTime',data,{
      headers : new HttpHeaders().set('content-type','application/json')
    })
  }

  deleteTime(data:any,id:any){
    // console.log(id);
    
    return this.Http.delete(this.url + 'deleted/'+id+"/"+data.idE+"/"+data.dure ,{
      headers: new HttpHeaders().set('content-type','application/json'),
      // params : {data : data}
    })
  }
}
