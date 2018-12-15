import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './views/survey/survey.component';
import { HintsComponent } from './views/hints/hints.component';
import { ThanksComponent } from './views/thanks/thanks.component';
import { Error404Component } from './views/error404/error404.component';

const routes: Routes = [
  {
    path: 'questionario',
    component: SurveyComponent
  },
  {
    path: 'agradecimento',
    component: ThanksComponent
  },
  {
    path: '',
    component: HintsComponent
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
