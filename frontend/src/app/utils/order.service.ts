import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  order(felhasznalo: string, jatek: string, idopont: string) {
    return this.http.post(environment.serverUrl + '/rendelesek/', {felhasznalo: felhasznalo, jatek: jatek, idopont: idopont}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }
}
