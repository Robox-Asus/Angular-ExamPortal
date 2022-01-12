import { Serializer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId = 0;
  qTitle = null;
  question:any=[];

  constructor(private _route:ActivatedRoute,private ques:QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this.ques.getQuestions(this.qId).subscribe(
      (success)=>{
        this.question = success;
        Swal.fire('Success !!!','Successfully Question Loaded !!!','success'); 
      },(error) => {
        console.log(error);
        Swal.fire('Error !!!','Something Wrong Happened','error');
      }
    );
  }

  deleteQuestion(questionId:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure ? ',
      showCancelButton:true,
      confirmButtonText:'Delete',
    }).then((result)=>{
      if(result.isConfirmed) {
        this.ques.deleteQuestion(questionId).subscribe(
          (success) =>{
            this.question = this.question.filter((q:any)=> q.quesId != questionId);
            Swal.fire('success','Successfully Deleted','success');
          },(error)=>{
            Swal.fire('Error !!!','Something wrong Happened','error');
          }
        );
      }
    });
  }

}
