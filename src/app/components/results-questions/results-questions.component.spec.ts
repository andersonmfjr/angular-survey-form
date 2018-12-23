import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsQuestionsComponent } from './results-questions.component';

describe('ResultsQuestionsComponent', () => {
  let component: ResultsQuestionsComponent;
  let fixture: ComponentFixture<ResultsQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
