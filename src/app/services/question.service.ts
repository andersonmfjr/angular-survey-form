import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../models/question-dropdown';
import { QuestionBase } from '../models/question-base';
import { TextareaQuestion } from '../models/question-textarea';
import { RadioQuestion } from '../models/question-radio';

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {
    const questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        value: '',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      }),

      new RadioQuestion({
        key: 'solid',
        label: 'Radio question',
        required: true,
        options: {
          firstcolumn: [
            { key: 'radio1', name: 'color', value: 'red', label: 'Red' },
            { key: 'radio2', name: 'color', value: 'green', label: 'Green' },
            { key: 'radio3', name: 'color', value: 'blue', label: 'Blue' }
          ],
          secondcolumn: [
            { key: 'radio4', name: 'color', value: 'yellow', label: 'Yellow' },
            { key: 'radio5', name: 'color', value: 'white', label: 'White' }
          ]
        },
        order: 4
      }),

      new TextareaQuestion({
        key: 'firstName',
        label: 'First name',
        value: '',
        required: true,
        order: 1
      }),

      new TextareaQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
