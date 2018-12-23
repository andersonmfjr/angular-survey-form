import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  schoolSubjects = [
    {
      name: 'ALGORITMOS E LÓGICA DE PROGRAMAÇÃO',
      id: 1
    },
    {
      name: 'ORGANIZAÇÃO DE EMPRESAS',
      id: 2
    }
  ];

  graphs = [
    {
      label: 'Importância da disciplina para sua formação profissional',
      answers: [
        {
          name: 'Muito bom',
          value: 70
        },
        {
          name: 'Bom',
          value: 10
        },
        {
          name: 'Regular',
          value: 10
        },
        {
          name: 'Ruim',
          value: 5
        },
        {
          name: 'Péssimo',
          value: 0
        },
        {
          name: 'Não sei responder',
          value: 0
        }
      ]
    },
    {
      label:
        'Grau de atualização do conteúdo ministrado com relação ao mercado de trabalho',
      answers: [
        {
          name: 'Muito bom',
          value: 30
        },
        {
          name: 'Bom',
          value: 50
        },
        {
          name: 'Regular',
          value: 10
        },
        {
          name: 'Ruim',
          value: 0
        },
        {
          name: 'Péssimo',
          value: 0
        },
        {
          name: 'Não sei responder',
          value: 5
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
