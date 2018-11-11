import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { QuestionBase } from '../../models/question-base';
import { QuestionControlService } from '../../services/question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input()
  groups: object[] = [];

  form: FormGroup;
  payLoad = '';

  lenOfQuestions: number;
  questionsAnswered = 0;

  constructor(private _qcs: QuestionControlService, private _router: Router) {}

  ngOnInit() {
    const questions: QuestionBase<any>[] = [];
    this.groups.forEach(gp => {
      gp['questions'].forEach(qs => {
        questions.push(qs);
      });
    });
    this.form = this._qcs.toFormGroup(questions);
    this.lenOfQuestions = questions.length;
  }

  onSubmit() {
    console.log('submit chamado');
    this._router.navigate(['/agradecimento']);
    this.payLoad = JSON.stringify(this.form.value);
    console.log(this.payLoad);
  }

  receiverQtQuestions(values) {
    let qtd = 0;
    for (const [key, val] of Object.entries(values)) {
      if (val) {
        qtd = qtd + 1;
      }
    }
    this.questionsAnswered = qtd;
  }
}
