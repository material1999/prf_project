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

  getItem(id: String) {
    return this.http.get(environment.serverUrl + '/jatekok/' + id,
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }

  getRendeles(felhasznalo: String) {
    return this.http.get(environment.serverUrl + '/rendelesek/' + felhasznalo,
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }

  getRendelesek() {
    return this.http.get(environment.serverUrl + '/rendelesek/',
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }

  getUsers() {
    return this.http.get(environment.serverUrl + '/users/',
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }
}
