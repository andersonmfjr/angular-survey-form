import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ScrollToService,
  ScrollToConfigOptions
} from '@nicky-lenaers/ngx-scroll-to';

import { QuestionBase } from '../../models/question-base';

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

  @Output()
  formValues = new EventEmitter();

  constructor(private _scrollToService: ScrollToService) {}

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  hideVirtualKeyboard() {
    const element = document.activeElement as HTMLInputElement;
    const elementTextarea = document.activeElement as HTMLTextAreaElement;

    if (typeof element.blur === 'function') {
      element.blur();
    }

    if (typeof elementTextarea.blur === 'function') {
      elementTextarea.blur();
    }
  }

  qtQuestions() {
    this.formValues.emit(this.form.value);
  }

  public scrollTo(questionId) {
    const element = document.activeElement as HTMLInputElement;
    const elementTextarea = document.activeElement as HTMLTextAreaElement;

    if (typeof element.blur === 'function') {
      element.blur();
    }

    if (typeof elementTextarea.blur === 'function') {
      elementTextarea.blur();
    }

    const nextNumber = +questionId + 1;
    const nextTarget = `questao${nextNumber}`;

    const config: ScrollToConfigOptions = {
      duration: 650,
      target: nextTarget,
      easing: 'easeOutQuad',
      offset: -150
    };

    if (nextNumber <= this.lenOfQuestions) {
      this._scrollToService.scrollTo(config);
    }
  }
}
