import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any = [];
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: ''
    },
  }

  constructor(private _cat: CategoryService, private _snack: MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      }, (error) => {
        console.log(error);
        Swal.fire("Error !!", 'Something Wrong Happened', 'error');
      });
  }

  addQuiz() {
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any) => {
        Swal.fire('Success !!','Quiz Successfully Added...','success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: ''
          },
        }
      }, (error)=>{
        Swal.fire('Error !!','Something Wrong Happened','error');
      }
    );
  }
}
