import { LocationStrategy } from '@angular/common';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css'],
})
export class QuizStartComponent implements OnInit {
  qId: any;
  questions: any;

  // scoring variable
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  timer: any;

  isSubmit: boolean = false;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params['id'];
    console.log(this.qId);
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizTest(this.qId).subscribe(
      (success: any) => {
        this.questions = success;
        this.timer = this.questions.length * 2 * 60;
        this.startTimer();
        console.log(success);
      },
      (error) => {
        Swal.fire('Error !!!', 'Something Wrong Happened', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `Cancel`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    this.isSubmit = true;
    this._question.evalQuiz(this.questions).subscribe(
      (success:any)=>{
        this.correctAnswers = success['correctAnswers'];
        this.marksGot = parseFloat(Number(success['marksGot']).toFixed(2));
        this.attempted = success['attempted'];
      },(error)=>{
        console.log(error);
      }
    );
  }

  print() {
    window.print();
  }
}
