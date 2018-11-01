import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../models/question-base';
import { QuestionControlService } from '../services/question-control.service';

import mostVisible from 'most-visible';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input()
  questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  lenOfQuestions: number;

  constructor(private qcs: QuestionControlService) {}

  ngOnDestroy() {
    window.removeEventListener('scroll', this.divMostVisible, true);
  }

  ngOnInit() {
    window.addEventListener('scroll', this.divMostVisible, true);
    this.form = this.qcs.toFormGroup(this.questions);
    this.lenOfQuestions = this.questions.length;
  }

  onSubmit() {
    console.log('submit chamado');
    this.payLoad = JSON.stringify(this.form.value);
  }

  divMostVisible = () => {
    const element = mostVisible('.question-container');
    if (element) {
      return element.id.toString();
    }
  }
}
