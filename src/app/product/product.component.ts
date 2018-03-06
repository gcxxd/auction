import { Component, OnInit } from '@angular/core';
import { ProductService,Product } from '../shared/product.service';
import { FormControl } from '@angular/forms';  
import {Observable} from 'rxjs';
import 'rxjs/Rx';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Observable<Product[]>;

  
  constructor(private productService:ProductService) { 
    
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    console.log(this.products);
    this.productService.searchEvent.subscribe(
      params=>this.products=this.productService.search(params)
    );
  }

}


