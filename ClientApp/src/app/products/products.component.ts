import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Products } from '../Models/Products';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  ProductList?: any;
  ProductList1?: any;
  productForm: any;
  massage = "";
  prodCategory = "";
  Id = 0;
  constructor(private formbulider: FormBuilder,
    private productService: ProductsService, private router: Router,
    private jwtHelper: JwtHelperService, private toastr: ToastrService) { }
  ngOnInit() {
    this.prodCategory = "0";
    this.productForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Cost: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Stock: ['', [Validators.required]]
    });
    this.getProductList();
  }
  getProductList() {
    this.productService.getProductList().subscribe({
      next: (response: Products[]) => {
        console.log('Response data:', response);
        this.ProductList1 = response;
        this.ProductList = this.ProductList1;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
    
  }
  PostProduct(product: Products) {
    const product_Master = this.productForm.value;
    this.productService.postProductData(product_Master).subscribe(
      () => {
        this.getProductList();
        this.productForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  ProductDetailsToEdit(id: string) {
    this.productService.getProductDetailsById(id).subscribe(productResult => {
      this.Id = productResult.Id;
      this.productForm.controls['Name'].setValue(productResult.Name);
      this.productForm.controls['Cost'].setValue(productResult.Cost);
      this.productForm.controls['Description'].setValue(productResult.Description);
      this.productForm.controls['Stock'].setValue(productResult.Stock);
    });
  }
  UpdateProduct(product: Products) {
    product.Id = this.Id;
    const product_Master = this.productForm.value;
    this.productService.updateProduct(product_Master).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.productForm.reset();
      this.getProductList();
    });
  }
  DeleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this.productService.deleteProductById(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getProductList();
      });
    }
  }
  Clear(product: Products) {
    this.productForm.reset();
  }
  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  isAdmin() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const hasAdminRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
      console.warn(hasAdminRole);
      return hasAdminRole;
    }

    return false;
  }
}
