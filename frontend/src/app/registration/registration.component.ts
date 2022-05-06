import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../utils/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  msg: string;
  regex: RegExp;

  constructor(private router: Router, private registrationService: RegistrationService) {
    this.username = '';
    this.password = '';
    this.email = '';
    this.msg = '';
    this.regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  }

  registration() {
    if (this.username != '' && this.password != '' && this.email != '') {
      if (!this.regex.test(this.email)) {
        this.msg = 'Nem megfelelő email cím!';
        console.log("nem jó")
      } else {
        this.registrationService.registration(this.username, this.password, this.email).subscribe(msg => {
          console.log(msg);
          this.msg = 'Sikeres regisztráció!'
        }, error => {
          console.log(error);
          if (error.error == "mar van ilyen") {
            this.msg = 'A felhasználónév már foglalt!';
          } else {
            this.msg= 'Valamilyen adatbázis hiba történt!'
          }
          
        })
      }
    } else {
      this.msg= 'Minden mező kitöltése kötelező!'
    }
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
