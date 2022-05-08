import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { environment } from './../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  product: Product;
  private BASE_URL: string; 

  constructor(private httpClient: HttpClient) { 
    this.product = {} as Product;
    this.BASE_URL = environment.serverUrl;
  }

  getProductList(pagination: Object){
    let params = new HttpParams();
    params = params.append("pagination",JSON.stringify(pagination));
    return this.httpClient.get(this.BASE_URL+'/api/product', {params} )
  }

  deleteProduct(_id: string){
    let params = new HttpParams();
    params = params.append("_id", _id);
    return this.httpClient.delete(this.BASE_URL+'/api/product', {params})
  }

  addProduct(productData: Object){
    return this.httpClient.post(this.BASE_URL+'/api/product', productData)
  }

  modifyProduct(productData: Object){
    return this.httpClient.put(this.BASE_URL+'/api/product', productData)
  }

  setProduct(product: Product){
    this.product = product;
  }

  getProduct(){
    return this.product;
  }
}