import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  questions: any[];

  constructor(service: QuestionService) {
    // service.getQuestions().then(questions => (this.questions = questions));
    this.questions = service.getQuestions();
  }

  ngOnInit() {}
}
