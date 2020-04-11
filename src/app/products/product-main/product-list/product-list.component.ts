import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  monitoredMode: boolean;

  constructor(private router: Router) {
    this.monitoredMode = (this.router.url === '/monitoreo') ? true : false;
  }

  ngOnInit(): void {
  }

}
