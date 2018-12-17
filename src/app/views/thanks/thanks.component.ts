import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {
  constructor(private _title: Title) {}

  ngOnInit() {
    this._title.setTitle('Agradecimento - Avaliação de curso');
  }
}
