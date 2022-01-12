import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;
  quiz: any = null;
  category: any = [];

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.quiz = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Something Wrong Happened', 'error');
        console.log(error);
      }
    );
    this._cat.getCategories().subscribe(
      (success)=>{
        this.category = success;
        console.log(success);
      },(error)=>{
        Swal.fire('Error !!!','Something Wrong Happened','error');
      }
    );
  }

  formSubmit() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (success)=>{
        Swal.fire('Succes !!!','Sucessfully Updated','success').then((e)=>{
          this.router.navigate([`/admin-dashboard/view-quizzes`]);
        });
      },(error)=>{
        console.log(error);
        Swal.fire('Error !!!','Something Wrong Happened','error');
      }
    );
  }

}
