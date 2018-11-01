import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../models/question-dropdown';
import { QuestionBase } from '../models/question-base';
import { TextareaQuestion } from '../models/question-textarea';
import { RadioQuestion } from '../models/question-radio';

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  /*getQuestions(): Promise<QuestionBase<any>[]> {
    return new Promise(resolve => {
      resolve(this.getQuestionsOriginal());
    });
  }*/
  getQuestions() {
    const questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key: 'rating',
        label: 'Bravery Rating',
        value: '',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        divId: 'questao3',
        order: 3
      }),

      new RadioQuestion({
        key: 'color',
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
        divId: 'questao1',
        order: 1
      }),

      new TextareaQuestion({
        key: 'name',
        label: 'First name',
        value: '',
        required: true,
        divId: 'questao4',
        order: 4
      }),

      new TextareaQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        divId: 'questao2',
        order: 2
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
