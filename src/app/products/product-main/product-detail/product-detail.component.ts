import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from '../../Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productUid: number;
  product: Product;

  constructor(private router: Router, private route: ActivatedRoute, private productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.productUid = params.id);
    this.product = this.productsService.getProductById(this.productUid);
    if (this.product === undefined) {
      this.router.navigate(['/404']);
    }
  }

}
