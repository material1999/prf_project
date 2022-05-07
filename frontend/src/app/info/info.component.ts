import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private listService: ListService) {
    this.id = this.route.snapshot['_routerState'].url.split('/')[2];
    if (localStorage.getItem('accessLevel') == 'admin') {
      this.accessLevel = true;
    } else {
      this.accessLevel = false;
    }

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

}
