import { Component } from '@angular/core';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  providers: [QuestionService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions: any[];

  constructor(service: QuestionService) {
    // service.getQuestions().then(questions => (this.questions = questions));
    this.questions = service.getQuestions();
  }
}
