import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  //get Quiz Questions
  public getQuestions(quesId: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${quesId}`);
  }

  //get Quiz Questions by
  public getQuestionsOfQuizTest(quesId: any) {
    return this._http.get(`${baseUrl}/question/quiz/${quesId}`);
  }

  // add Quiz Question
  public addQuestions(data: any) {
    return this._http.post(`${baseUrl}/question/`, data);
  }

  //delete Question
  public deleteQuestion(qId: any) {
    return this._http.delete(`${baseUrl}/question/${qId}`);
  }

  //eval quiz
  public evalQuiz(data: any) {
      return this._http.post(`${baseUrl}/question/eval-quiz`, data);
  }
}
