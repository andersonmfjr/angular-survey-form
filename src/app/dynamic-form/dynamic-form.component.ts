import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../models/question-base';
import { QuestionControlService } from '../services/question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input()
  questions: QuestionBase<any>[] = [];

  form: FormGroup;
  payLoad = '';

  instaceMostVisible: any;

  lenOfQuestions: number;

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.lenOfQuestions = this.questions.length;
  }

  onSubmit() {
    console.log('submit chamado');
    this.payLoad = JSON.stringify(this.form.value);
  }
}
