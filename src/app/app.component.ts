import {
  Component,
  Inject,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { QuestionService } from './services/question.service';
import { DOCUMENT } from '@angular/common';
import {
  PageScrollConfig,
  PageScrollService,
  PageScrollInstance
} from 'ngx-page-scroll';

import mostVisible from 'most-visible';

@Component({
  selector: 'app-root',
  providers: [QuestionService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('container')
  private container: ElementRef;

  questions: any[];

  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    service: QuestionService
  ) {
    PageScrollConfig.defaultScrollOffset = 200;
    PageScrollConfig.defaultDuration = 400;
    this.questions = service.getQuestions();
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    console.log('scroll');
    const element = mostVisible('.question-container');
    return element.id;
  }

  public goToHead2(): void {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(
      this.document,
      '#questao2'
    );
    this.pageScrollService.start(pageScrollInstance);
  }
}
