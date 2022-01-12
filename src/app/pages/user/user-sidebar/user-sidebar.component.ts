import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  category: any;

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _quiz:QuizService,
    private router:Router,
    private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
      this._category.getCategories().subscribe(
        (success) => {
          this.category = success;
          console.log(this.category);
          this._snack.open('Category Loaded', 'OK', {
            duration: 3000,
          });
        },
        (error) => {
          this._snack.open('Something Wrong Happened', 'OK', {
            duration: 3000,
          });
        }
      );
    } 
}
