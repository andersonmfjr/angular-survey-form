import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  providers: [QuestionService]
})
export class SurveyComponent implements OnInit {
  groups: Object[];
  showError = false;

  constructor(private _service: QuestionService, private _title: Title) {
    this.getGroupOfQuestions();
  }

  async getGroupOfQuestions() {
    try {
      this.groups = await this._service.getQuestions();
    } catch (e) {
      this.showError = true;
      // console.log(e);
    }
    // this.groups = await this._service.getQuestions();
  }

  ngOnInit() {
    this._title.setTitle('Questionário - Avaliação de curso');
  }
}
