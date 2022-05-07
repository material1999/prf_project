import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../utils/list.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  accessLevel: boolean;
  items: any;
  user: String;

  constructor(private listService: ListService, private router: Router) {
    if (localStorage.getItem('accessLevel') == 'admin') {
      this.accessLevel = true;
    } else {
      this.accessLevel = false;
    }
    this.user = localStorage.getItem('user') || '';
  }

  ngOnInit(): void {
    this.listService.getUsers().subscribe(msg => {
      console.log(msg);
      this.items = JSON.parse(msg.body || '')
      console.log(this.items);
    }, error => {
      console.log(error);
    })
  }

  navToOrders() {
    console.log(this.user)
    if (!this.accessLevel) {
      this.router.navigate(['/orders/' + this.user]);
    } else {
      this.router.navigate(['/orders']);
    }
  }

}
