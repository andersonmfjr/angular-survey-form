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

  /*
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
    order: 3
  })
  */

  /*
  new TextareaQuestion({
        key: 'name',
        label: 'First name',
        value: '',
        required: true,
        divId: 'questao4',
        order: 4
      }),
*/

  getQuestions() {
    const questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key: 'grade',
        label: 'Selecione a sua grade curricular:',
        value: '',
        required: true,
        options: [
          { key: '2018', value: '2018 - Grade nova' },
          { key: '2012', value: '2012 - Grade nova' }
        ],
        order: 1
      }),

      new DropdownQuestion({
        key: 'materia',
        label: 'Selecione a matéria:',
        value: '',
        required: true,
        options: [
          { key: 'orge', value: 'Organização de empresas' },
          { key: 'proo', value: 'Programação orientada a objetos' },
          { key: 'mpec', value: 'Metodologia da pesquisa científica' }
        ],
        order: 2
      }),

      new DropdownQuestion({
        key: 'materia',
        label: 'Selecione o professor:',
        value: '',
        required: true,
        options: [
          { key: 'flavio', value: 'Flávio Mota Medeiros' },
          { key: 'elvys', value: 'Elvys' }
        ],
        order: 3
      }),

      new RadioQuestion({
        key: 'dominioconteudo',
        label: 'O professor aparenta ter domínio do conteúdo?',
        required: true,
        options: {
          firstcolumn: [
            {
              key: 'radio1',
              name: 'dominioconteudo',
              value: '5',
              label: 'Extremamente'
            },
            {
              key: 'radio2',
              name: 'dominioconteudo',
              value: '4',
              label: 'Muito'
            },
            {
              key: 'radio3',
              name: 'dominioconteudo',
              value: '3',
              label: 'Um pouco'
            }
          ],
          secondcolumn: [
            {
              key: 'radio4',
              name: 'dominioconteudo',
              value: '2',
              label: 'Nem tanto'
            },
            {
              key: 'radio5',
              name: 'dominioconteudo',
              value: '1',
              label: 'De forma alguma'
            }
          ]
        },
        order: 4
      }),

      new RadioQuestion({
        key: 'conteudoclaro',
        label:
          'O quão claro o professor apresentou o material de curso (método de avaliação, cronograma, etc)?',
        required: true,
        options: {
          firstcolumn: [
            {
              key: 'radio1',
              name: 'conteudoclaro',
              value: '5',
              label: 'Extremamente claro'
            },
            {
              key: 'radio2',
              name: 'conteudoclaro',
              value: '4',
              label: 'Muito claro'
            },
            {
              key: 'radio3',
              name: 'conteudoclaro',
              value: '3',
              label: 'Um pouco'
            }
          ],
          secondcolumn: [
            {
              key: 'radio4',
              name: 'conteudoclaro',
              value: '2',
              label: 'Nem tanto'
            },
            {
              key: 'radio5',
              name: 'conteudoclaro',
              value: '1',
              label: 'De forma alguma'
            }
          ]
        },
        order: 5
      }),

      new TextareaQuestion({
        key: 'profaberta',
        label:
          'Tem algum outro comentário a acrescentar sobre o professor ou sobre a matéria? Críticas, comentários, dicas?',
        value: '',
        required: true,
        order: 6
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
