import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  qId = 0;
  quizzes:any =[];

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      (params) =>{
        this.qId = params['id'];
        console.log(this.qId);
        if(this.qId == 0) {
          this._quiz.getActiveQuizzes().subscribe(
             (success)=>{
               console.log("success : "+success);
               this.quizzes = success;
               this._snack.open('Data Loaded Successfully','OK');
             },  
             (error)=>{
               this._snack.open('Something Wrong Happened','OK'); 
             }
           );
          } else {
            this._quiz.getActiveQuizzesByCategory(this.qId).subscribe(
              (success)=>{
                this.quizzes=success;
              },(error)=>{
               console.log(error);
              }
            );
          }
      }
    );
  }

}
