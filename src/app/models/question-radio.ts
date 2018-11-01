import { QuestionBase } from './question-base';

export class RadioQuestion extends QuestionBase<string> {
  controlType = 'radio';
  options: { firstcolumn: object; secondcolumn: object }[] = [];

  // Objeto com as seguinte propriedades: key: string; name: string; label: string; value: number/string

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
