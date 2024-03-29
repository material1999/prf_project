import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../utils/list.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  id: String;
  accessLevel: boolean;
  item: any;
  user: String;

  constructor(private route: ActivatedRoute, private listService: ListService, private router: Router) {
    this.id = this.route.snapshot['_routerState'].url.split('/')[2];
    if (localStorage.getItem('accessLevel') == 'admin') {
      this.accessLevel = true;
    } else {
      this.accessLevel = false;
    }
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

  navToOrders() {
    console.log(this.user)
    if (!this.accessLevel) {
      this.router.navigate(['/orders/' + this.user]);
    } else {
      this.router.navigate(['/orders']);
    }
  }

}
