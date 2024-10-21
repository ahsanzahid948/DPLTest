import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { Category } from '../Models/Category';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList?: any;
  categoryList1?: any;
  categoryForm: any;
  massage = "";
  prodCategory = "";
  Id = 0;
  constructor(private formbulider: FormBuilder,
    private categoryervice: CategoryService, private router: Router,
    private jwtHelper: JwtHelperService, private toastr: ToastrService) { }
  ngOnInit() {
    this.prodCategory = "0";
    this.categoryForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Cost: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Stock: ['', [Validators.required]]
    });
    this.getcategoryList();
  }
  getcategoryList() {
    this.categoryervice.getCategoryList().subscribe({
      next: (response: Category[]) => {
        console.log('Response data:', response);
        this.categoryList1 = response;
        this.categoryList = this.categoryList1;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
    
  }
  Postcategory(category: Category) {
    const category_Master = this.categoryForm.value;
    this.categoryervice.postCategoryData(category_Master).subscribe(
      () => {
        this.getcategoryList();
        this.categoryForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  CategoryDetailsToEdit(id: string) {
    this.categoryervice.getProductCategoryById(id).subscribe(categoryResult => {
      this.Id = categoryResult.Id;
      this.categoryForm.controls['Name'].setValue(categoryResult.Name);
      this.categoryForm.controls['Description'].setValue(categoryResult.Description);
    });
  }
  UpdateCategory(category: Category) {
    category.Id = this.Id;
    const category_Master = this.categoryForm.value;
    this.categoryervice.updateCategory(category_Master).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.categoryForm.reset();
      this.getcategoryList();
    });
  }
  DeleteCategory(id: number) {
    if (confirm('Do you want to delete this category?')) {
      this.categoryervice.deleteCategoryById(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getcategoryList();
      });
    }
  }
  Clear(category: Category) {
    this.categoryForm.reset();
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
