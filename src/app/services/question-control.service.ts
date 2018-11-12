import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../models/question-base';

@Injectable()
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required
        ? new FormControl(question.value || null, Validators.required)
        : new FormControl(question.value || null);
    });
    return new FormGroup(group);
  }
}
