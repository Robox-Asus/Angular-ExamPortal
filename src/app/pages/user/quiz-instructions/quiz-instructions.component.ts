import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css'],
})
export class QuizInstructionsComponent implements OnInit {
  qId: any;
  quiz: any;

  constructor(private _router: ActivatedRoute, 
    private _quiz: QuizService, private _route:Router) {}

  ngOnInit(): void {
    this.qId = this._router.snapshot.params['id'];
    this._quiz.getQuiz(this.qId).subscribe(
      (success) => {
        console.log(success);
        this.quiz = success;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  floatToDecimal(value:number) {
    return value.toFixed(2);
  }

  start() {
    Swal.fire({
      title: 'Do you want to start the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Start!', '', 'success');
        this._route.navigate(['quiz-start/'+this.qId]);
      } else if (result.isDenied) {
        Swal.fire('Quiz is not started', '', 'info')
      }
    })
  }
}
