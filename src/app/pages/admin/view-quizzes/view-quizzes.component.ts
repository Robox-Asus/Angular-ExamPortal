import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any = [];

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this._quiz.getQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log("get question by quiz id"+data);
        Swal.fire('Success', 'Successfully Added', 'success');
      },
      (error) => {
        Swal.fire('Error !!', 'Something Went wrong', 'error');
      }
    );
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qId).subscribe(
          (success) => {
            this.quizzes = this.quizzes.filter((data:any)=> data.qId != qId);
            console.log(success);
            Swal.fire('Success !!!', 'Deleted Successfully', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!!', 'Something Wrong Happened', 'error');
          }
        );
      }
    });
  }
}
