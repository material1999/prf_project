import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../utils/list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  accessLevel: boolean;
  items: any;

  constructor(private listService: ListService, private router: Router) {
    if (localStorage.getItem('accessLevel') == 'admin') {
      this.accessLevel = true;
    } else {
      this.accessLevel = false;
    }
    
  }

  ngOnInit(): void {
    this.listService.list().subscribe(msg => {
      console.log(msg);
      this.items = JSON.parse(msg.body || '')
      console.log(this.items);
    }, error => {
      console.log(error);
    })
  }

  buy(id: String) {
    console.log('buy:', id);
    this.router.navigate(['/buy/' + id]);
  }

  info(id: String) {
    console.log('info:', id);
    this.router.navigate(['/info/' + id]);
  }

}
