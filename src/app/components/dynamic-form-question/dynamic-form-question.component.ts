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
    return new Promise(resolve => {
      const element = document.activeElement as HTMLInputElement;

      if (typeof element.blur === 'function') {
        element.blur();
        resolve('Keyboard ocultado');
      } else {
        resolve('Nao tinha keyboard para ocultar');
      }
    });
  }

  qtQuestions() {
    this.formValues.emit(this.form.value);
  }

  async scrollTo(questionId) {
    const result = await this.hideVirtualKeyboard();

    if (result) {
      alert('Await terminado');
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
      console.log('Função de animação');
    }
  }
}
