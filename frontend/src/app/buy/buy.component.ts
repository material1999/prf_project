import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../utils/list.service';
import { OrderService } from '../utils/order.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  id: String;
  accessLevel: boolean;
  item: any;
  msg: String;
  user: String;

  constructor(private route: ActivatedRoute, private listService: ListService, private orderService: OrderService, private router: Router) {
    this.id = this.route.snapshot['_routerState'].url.split('/')[2];
    if (localStorage.getItem('accessLevel') == 'admin') {
      this.accessLevel = true;
    } else {
      this.accessLevel = false;
    }
    this.msg = '';
    this.user = localStorage.getItem('user') || '';
  }

  ngOnInit(): void {
    this.listService.getItem(this.id).subscribe(msg => {
      console.log(msg);
      this.item = JSON.parse(msg.body || '')
      console.log(this.item);
    }, error => {
      console.log(error);
    })
  }

  buy() {
    let felhasznalo = localStorage.getItem('user');
    let time = new Date().toUTCString()
    console.log(felhasznalo)
    console.log(this.item.cim)
    console.log(time)
    this.orderService.order(felhasznalo || '', this.item.cim, time).subscribe(msg => {
      console.log(msg);
    }, error => {
      console.log(error);
      if (error.error == "mar van ilyen") {
        this.msg = 'A felhasználónév már foglalt!';
      } else {
        this.msg= 'Valamilyen adatbázis hiba történt!'
      }
    })
    this.msg = "Sikeres vásárlás!"
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
