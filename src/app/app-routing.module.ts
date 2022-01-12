import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/dashboard/user-dashboard.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { VeiwCategoriesComponent } from './pages/admin/veiw-categories/veiw-categories.component';
import { ViewCategoryComponent } from './pages/admin/add-category/view-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';
const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children: [
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'categories',
        component:VeiwCategoriesComponent,
      },
      {
        path:'add-category',
        component:ViewCategoryComponent,
      },
      {
        path:'view-quizzes',
        component:ViewQuizzesComponent,
      },
      {
        path:'add-quiz',
        component:AddQuizComponent,
      },
      {
        path:'update-quiz/:qId',
        component:UpdateQuizComponent,
      },
      {
        path:'questions/:id/:title',
        component:ViewQuizQuestionsComponent,
      },
      {
        path:'add-question/:id/:title',
        component:AddQuestionComponent,
      }
    ],
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:':id',
        component:LoadQuizComponent,
      },
      {
        path:'quiz-instructions/:id',
        component:QuizInstructionsComponent,
      },
    ],
  },
  {
    path:'quiz-start/:id',
    component:QuizStartComponent,
    canActivate:[NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
