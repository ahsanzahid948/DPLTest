import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../Models/Products';
import { Result } from '../Models/Result';
import {Config} from '../../../src/config'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  url = 'https://localhost:7021/api/product/';
  constructor(private http: HttpClient) { }
  getProductList(): Observable<Products[]> {
    var result = this.http.get<Products[]>(this.url);
    console.warn(result);
    return result;
  }
  postProductData(productData: Products): Observable<Products> {
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Products>(this.url, productData, httpHeaders);
  }
  updateProduct(product: Products): Observable<Products> {
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.patch<Products>(this.url, product, httpHeaders);
  }
  deleteProductById(id: number): Observable<number> {
    return this.http.delete<number>(this.url + '?id=' + id);
  }
  getProductDetailsById(id: string): Observable<Products> {
    return this.http.get<Products>(this.url + '?id=' + id);
  }
}
