import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../models/question-dropdown';
import { QuestionBase } from '../models/question-base';
import { TextareaQuestion } from '../models/question-textarea';
import { RadioQuestion } from '../models/question-radio';

import { QGL_GET_ALL_DATA, MUTATE_REPLIES } from '../utils/queries.js';

import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable()
export class QuestionService {
  constructor(private _apollo: Apollo) {}

  CATEGORY_ID_FIXED_QUESTIONS = 0;
  QT_OF_FIXED_QUESTIONS = 3;

  getDataFromGraphQl() {
    const data = this._apollo
      .watchQuery({
        query: QGL_GET_ALL_DATA
      })
      .valueChanges.pipe(map(result => result.data));

    return data;
  }

  formatAllData() {
    return new Promise(resolve => {
      this.getDataFromGraphQl().subscribe(data => {
        const formatedData = {};
        const questions = this.formatQuestions(data);
        const schoolSubjects = this.formatSchoolSubjects(data);
        const teachers = this.formatTeachers(data);
        const courses = this.formatCourses(data);
        const categories = this.formatCategories(data);

        formatedData['questions'] = questions;
        formatedData['schoolSubjects'] = schoolSubjects;
        formatedData['teachers'] = teachers;
        formatedData['courses'] = courses;
        formatedData['categories'] = categories;

        resolve(formatedData);
      });
    });
  }

  formatCategories(data) {
    const categories = [];

    const fixedCategory = {
      categoryId: +this.CATEGORY_ID_FIXED_QUESTIONS,
      order: +this.CATEGORY_ID_FIXED_QUESTIONS,
      name: '',
      questions: []
    };

    categories.push(fixedCategory);

    data.allCategory.edges.forEach(el => {
      categories.push({
        categoryId: +el.node.categoryId,
        order: +el.node.position,
        name: el.node.description,
        questions: []
      });
    });

    return categories.sort((a, b) => a.order - b.order);
  }

  formatCourses(data) {
    const courses = [];

    data.allCourse.edges.forEach(el => {
      courses.push({
        value: el.node.courseId,
        label: el.node.name
      });
    });

    return courses;
  }

  formatTeachers(data) {
    const teachers = [];

    data.allTeacher.edges.forEach(el => {
      teachers.push({
        key: el.node.teacherId,
        name: el.node.name
      });
    });

    return teachers;
  }

  formatSchoolSubjects(data) {
    const schoolSubjects = [];

    data.allSchoolSubjects.edges.forEach(el => {
      schoolSubjects.push({
        key: el.node.schoolSubjectId,
        name: el.node.name
      });
    });

    return schoolSubjects;
  }

  formatQuestions(data) {
    const questions = [];
    data.allQuestion.edges.forEach(el => {
      if (el.node.isChoice) {
        const offeredAnswers = el.node.offeredAnswers.edges.sort(
          (a, b) => a.node.position - b.node.position
        );
        const amountQuestionsInColumns = Math.floor(offeredAnswers.length / 2);

        const questionsInFirstColumn = [];
        const questionsInSecondColumn = [];

        offeredAnswers.forEach((element, index) => {
          if (index < amountQuestionsInColumns) {
            questionsInFirstColumn.push({
              key: `${el.node.questionId}${index}`,
              name: el.node.questionId,
              value: element.node.offeredAnswerId,
              label: element.node.answerText
            });
          } else {
            questionsInSecondColumn.push({
              key: `${el.node.questionId}${index}`,
              name: el.node.questionId,
              value: element.node.position,
              label: element.node.answerText
            });
          }
        });

        questions.push(
          new RadioQuestion({
            key: el.node.questionId,
            category: +el.node.category.categoryId,
            label: el.node.questionText,
            required: el.node.required,
            order: +(el.node.position + this.QT_OF_FIXED_QUESTIONS),
            options: {
              firstcolumn: questionsInFirstColumn,
              secondcolumn: questionsInSecondColumn
            }
          })
        );
      } else {
        questions.push(
          new TextareaQuestion({
            key: el.node.questionId,
            category: +el.node.category.categoryId,
            label: el.node.questionText,
            value: '',
            required: el.node.required,
            order: +(el.node.position + this.QT_OF_FIXED_QUESTIONS)
          })
        );
      }
    });

    return questions;
  }

  async getQuestions() {
    const allFormatedData = await this.formatAllData();
    const group = allFormatedData['categories'];

    const fixedQuestions: QuestionBase<any>[] = [
      new RadioQuestion({
        key: 'course',
        label: 'Selecione a sua grade curricular:',
        value: '',
        category: +this.CATEGORY_ID_FIXED_QUESTIONS,
        required: true,
        options: {
          firstcolumn: [
            { key: 'grade1', name: 'grade', ...allFormatedData['courses'][0] },
            { key: 'grade2', name: 'grade', ...allFormatedData['courses'][1] }
          ]
        },
        order: 1
      }),
      new DropdownQuestion({
        key: 'schoolSubject',
        label: 'Selecione a matéria:',
        value: '',
        category: +this.CATEGORY_ID_FIXED_QUESTIONS,
        required: true,
        options: allFormatedData['schoolSubjects'],
        order: 2
      }),
      new DropdownQuestion({
        key: 'teacher',
        label: 'Selecione o professor:',
        value: '',
        category: +this.CATEGORY_ID_FIXED_QUESTIONS,
        required: true,
        options: allFormatedData['teachers'],
        order: 3
      })
    ];

    const questions = fixedQuestions.concat(allFormatedData['questions']);

    const questionsSorted = questions.sort((a, b) => a.order - b.order);

    group.forEach(gr => {
      questionsSorted.forEach(qs => {
        if (qs.category === gr.categoryId) {
          gr.questions.push(qs);
        }
      });
    });

    return group;
  }

  async formatDataToMutation(questionsAnswers) {
    // teacherId: 1, schoolSubjectId: 1, questionsId: [1,2], replies: ["txt", "1"]
    const teacherId = +questionsAnswers['teacher'];
    const schoolSubjectId = +questionsAnswers['schoolSubject'];
    const courseId = +questionsAnswers['course'];

    const questionsId = [];
    const replies = [];

    for (const [key, val] of Object.entries(questionsAnswers)) {
      if (isNaN(+key) === false) {
        questionsId.push(+key);
        replies.push(val.toString());
      }
    }

    const result = await this.mutationData(
      teacherId,
      schoolSubjectId,
      courseId,
      questionsId,
      replies
    );

    return result;
  }

  mutationData(teacher, schoolSubject, course, questions, replies) {
    return new Promise(resolve => {
      this._apollo
        .mutate({
          mutation: MUTATE_REPLIES,
          variables: {
            teacherId: teacher,
            schoolSubjectId: schoolSubject,
            courseId: course,
            questionsId: questions,
            replies: replies
          }
        })
        .subscribe(res => {
          resolve(res);
        });
    });
  }
}
