import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId: any;
  qTitle: any;
  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.question.quiz['qId'] = this.qId;
    this.qTitle = this._route.snapshot.params['title'];
  }

  formSubmit() {
    if (
      this.question.content.trim() != '' ||
      this.question.answer.trim() != ''
    ) {
      this._question.addQuestions(this.question).subscribe(
        (success) => {
          Swal.fire('Success !!!', 'Successfully Added', 'success');
         this.router.navigate(['admin-dashboard/view-quizzes']);
        },
        (error) => {
          Swal.fire('Error !!!', 'Something Wrong Happened', 'error');
        }
      );
    }
  }
}
