import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  // view quiz
  public getQuizzes() {
    let data = this._http.get(`${baseUrl}/quiz/`);
    console.log("All quizzes : "+data);
    return data;
  }

  //add Quiz
  public addQuiz(data:any) {
    return this._http.post(`${baseUrl}/quiz/`,data);
  }

  //delete quiz
  public deleteQuiz(qId: any) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  // get quiz
  public getQuiz(qId:any) {
    console.log(qId);
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  // update quiz
  public updateQuiz(data:any) {
    return this._http.put(`${baseUrl}/quiz/`,data);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid:any) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get Active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //Get Active Quizzes by Category
  public getActiveQuizzesByCategory(cid:any) {
    return this._http.get(`${baseUrl}/quiz/active/${cid}`);
  }
                        
}
