import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registration(username: string, password: string, email: string) {
    return this.http.post(environment.serverUrl + '/users/' + username, {password: password, email: email}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }
}
