import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ScrollToService,
  ScrollToConfigOptions
} from '@nicky-lenaers/ngx-scroll-to';

import { QuestionBase } from '../models/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input()
  question: QuestionBase<any>;
  @Input()
  form: FormGroup;
  @Input()
  divMostVisible: any;
  @Input()
  lenOfQuestions: number;

  constructor(private _scrollToService: ScrollToService) {}

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  public scrollTo(questionId) {
    const nextNumber = +questionId + 1;
    const nextTarget = `questao${nextNumber}`;

    const config: ScrollToConfigOptions = {
      duration: 650,
      target: nextTarget,
      easing: 'easeOutQuad',
      offset: -200
    };

    if (nextNumber <= this.lenOfQuestions) {
      this._scrollToService.scrollTo(config);
    }
  }
}
