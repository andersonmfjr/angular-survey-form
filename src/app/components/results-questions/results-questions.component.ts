import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-questions',
  templateUrl: './results-questions.component.html',
  styleUrls: ['./results-questions.component.scss']
})
export class ResultsQuestionsComponent implements OnInit {
  @Input()
  data = Object;

  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Respostas';
  showYAxisLabel = true;
  yAxisLabel = 'Quantidade';
  constructor() {}

  ngOnInit() {}
}
