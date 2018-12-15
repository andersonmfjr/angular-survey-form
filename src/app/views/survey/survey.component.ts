import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  providers: [QuestionService]
})
export class SurveyComponent implements OnInit {
  groups: Object[];

  constructor(private _service: QuestionService) {
    this.getGroupOfQuestions();
  }

  async getGroupOfQuestions() {
    this.groups = await this._service.getQuestions();
  }

  ngOnInit() {}
}
