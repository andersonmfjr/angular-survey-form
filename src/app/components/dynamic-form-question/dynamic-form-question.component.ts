import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ScrollToService,
  ScrollToConfigOptions
} from '@nicky-lenaers/ngx-scroll-to';

import { QuestionBase } from '../../models/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
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
    return new Promise(resolve => {
      const element = document.activeElement as HTMLInputElement;
      const elementTextarea = document.activeElement as HTMLTextAreaElement;

      if (typeof element.blur === 'function') {
        resolve('Keyboard ocultado com input');
      } else {
        resolve(false);
      }

      if (typeof elementTextarea.blur === 'function') {
        resolve('Keyboard ocultado com textarea');
      } else {
        resolve(false);
      }
    });
  }

  qtQuestions() {
    this.formValues.emit(this.form.value);
  }

  async scrollTo(questionId) {
    const result = await this.hideVirtualKeyboard();

    if (result) {
      setTimeout(() => {
        this.goToNextElement(questionId);
      }, 300);
    } else {
      this.goToNextElement(questionId);
    }
  }

  goToNextElement(questionId) {
    const nextNumber = +questionId + 1;
    const nextTarget = `questao${nextNumber}`;

    if (nextNumber <= this.lenOfQuestions) {
      const config: ScrollToConfigOptions = {
        duration: 650,
        target: nextTarget,
        easing: 'easeOutQuad',
        offset: -150
      };

      this._scrollToService.scrollTo(config);
    } else {
      const config: ScrollToConfigOptions = {
        duration: 650,
        target: 'divenviar',
        easing: 'easeOutQuad',
        offset: -150
      };

      this._scrollToService.scrollTo(config);
    }
  }
}
