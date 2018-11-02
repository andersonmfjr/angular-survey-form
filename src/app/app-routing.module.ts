import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './pages/survey/survey.component';
import { HintsComponent } from './pages/hints/hints.component';
import { ThanksComponent } from './pages/thanks/thanks.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
