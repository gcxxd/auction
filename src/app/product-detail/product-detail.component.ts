import { Component, OnInit,OnChanges } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product,ProductService,Comment1} from '../shared/product.service';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productTitle: string;
  product:Product;
  comments:Comment1[];
  newRating:number =5;
  newComment:string="";
  isCommentHidden = true;
  constructor(private routeInfo: ActivatedRoute,
  private productService:ProductService) { 
    
  }
  ngOnInit() {
    let productId:number=this.routeInfo.snapshot.params['productId']; 
    
    this.productService.getProduct(productId).subscribe(
      product => this.product = product
    );
    this.productService.getCommentsForProduct(productId).subscribe(
      comments => this.comments = comments
    );
  }
  addComment(){
    let comment=new Comment1(0,this.product.id,new Date().toDateString(),"someone",this.newRating,this.newComment);
    this.comments.unshift(comment);
    let sum= this.comments.reduce((sum,comment)=>sum+=comment.rating,0);
    this.product.rating=sum/this.comments.length;
    this.newComment=null;
    this.newRating=5;
    this.isCommentHidden=true;
  }

}
