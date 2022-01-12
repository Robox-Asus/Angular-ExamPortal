import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})

export class ViewCategoryComponent implements OnInit {

  category = {
    title: '',
    description: ''
  }

  constructor(private snack: MatSnackBar, private _category: CategoryService) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null || this.category.description.trim() == '' || this.category.description == null) {
      this.snack.open('Title and Description cannot be blank', "OK", {
        duration: 3000,
      });
      return;
    }

    // add categories
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire('Success !!','Category Successfully Added '+data.cid,'success');
      },(error)=>{
        console.log(error);
        Swal.fire('Error !!!','Category Not Added','error');
      }
      );
  }


}
