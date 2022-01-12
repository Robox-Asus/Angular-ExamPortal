import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veiw-categories',
  templateUrl: './veiw-categories.component.html',
  styleUrls: ['./veiw-categories.component.css']
})
export class VeiwCategoriesComponent implements OnInit {

  category:any =[ ]

  constructor(private categories:CategoryService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.categories.getCategories().subscribe(
      (data:any) => {
        this.category = data;
        console.log(data);
      },
    (error) => {
      console.log(error);
      Swal.fire("Error !!","Error in loading Data",'error');
    }
    );
  }
}
