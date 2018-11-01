import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { HintsComponent } from './hints/hints.component';

const routes: Routes = [
  {
    path: 'survey',
    component: SurveyComponent
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
