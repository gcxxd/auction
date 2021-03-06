import { Injectable ,EventEmitter} from '@angular/core';
import {Http,URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
@Injectable()
export class ProductService {

  searchEvent : EventEmitter<ProductSearchParams>=new EventEmitter();

  constructor(private http:Http){
    
    
  
  };
  getAllCategories(): string[] {
    return ["电子产品","硬件设备","图书"];
  }
  getProducts(): Observable<Product[]> {
    return this.http.get("/api/products").map(res=>res.json()); 
  };
  getProduct(id:number): Observable<Product> {
    return this.http.get("/api/products/"+id).map(res=>res.json());
  };
  getCommentsForProduct(id:number): Observable<Comment1[]> {
    return this.http.get("/api/products/"+id+"/comments").map(res=>res.json());
  };
  search(params:ProductSearchParams): Observable<Product[]>{
    console.log(this.encodeParams(params))
    return this.http.get("/api/products/",{search:this.encodeParams(params)}).map(res=>res.json());
  };
  private encodeParams(params:ProductSearchParams){ 
    
    return Object.keys(params).filter(key=>params[key]).reduce((sum:URLSearchParams,key:string)=>{
      sum.append(key,params[key]);
      return sum;
    },new URLSearchParams());
  }
}
export class ProductSearchParams{
  constructor(
    public title:string,
    public price:number,
    public category:string
  ){

  }
}
 export class Product{
   constructor(
     public id:number,
     public title:string,
     public price:number,
     public rating:number,
     public desc:string,
     public categories:Array<string>
   ){

   }
 }
 export class Comment1{
   constructor(
     public id:number,
     public productId:number,
     public time:string,
     public user:string,
     public rating:number,
     public content:string
   ){

   }
}