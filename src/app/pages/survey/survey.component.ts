import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  providers: [QuestionService],
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  questions: any[];

  questionsGraphQl: any[];

  constructor(private _service: QuestionService) {
    this.getQuestions();
  }

  async getQuestions() {
    this.questions = await this._service.getQuestions();
  }

  ngOnInit() {}
}
