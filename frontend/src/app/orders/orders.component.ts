import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../utils/list.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  accessLevel: boolean;
  items: any;
  felhasznalo: String;
  user: String;

  constructor(private listService: ListService, private router: Router, private route: ActivatedRoute) {
    if (localStorage.getItem('accessLevel') == 'admin') {
      this.accessLevel = true;
    } else {
      this.accessLevel = false;
    }
    this.felhasznalo = this.route.snapshot['_routerState'].url.split('/')[2];
    this.user = localStorage.getItem('user') || '';
  }

  ngOnInit(): void {
    this.listService.getRendeles(this.felhasznalo).subscribe(msg => {
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
