import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(environment.serverUrl + '/jatekok',
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }
}
