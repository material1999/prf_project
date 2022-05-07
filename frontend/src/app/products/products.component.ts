import { Component, OnInit } from '@angular/core';
import { ListService } from '../utils/list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  accessLevel: boolean;
  items: any;

  constructor(private listService: ListService) {
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

}
