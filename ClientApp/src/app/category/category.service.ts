import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/Category';
import { Result } from '../Models/Result';
import {Config} from '../../../src/config'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 
  url = 'https://localhost:7021/api/category/';
  constructor(private http: HttpClient) { }
  getCategoryList(): Observable<Category[]> {
    var result = this.http.get<Category[]>(this.url);
    console.warn(result);
    return result;
  }
  postCategoryData(productData: Category): Observable<Category> {
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Category>(this.url, productData, httpHeaders);
  }
  updateCategory(product: Category): Observable<Category> {
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.patch<Category>(this.url, product, httpHeaders);
  }
  deleteCategoryById(id: number): Observable<number> {
    return this.http.delete<number>(this.url + '?id=' + id);
  }
  getProductCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(this.url + '?id=' + id);
  }
}
