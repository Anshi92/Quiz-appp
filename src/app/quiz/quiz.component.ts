import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuizService } from '../quiz.service';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {

  private url = 'https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json';
  private questions;
  private page = {
    index : 0 ,
    size : 1,
    count : 1
  };
  private options;
  private result ;
  showResult = false;
  @Output() valueChange = new EventEmitter();
  
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.loadQuiz();
  }

  reloadQuiz() {
    this.showResult = false;
    this.loadQuiz();
    this.page.index = 0;
  }

  loadQuiz() {
    this.quizService.get(this.url).subscribe(response => {
      let questionId = 0;
      this.questions = response;
      this.page.count = this.questions.length;
      this.questions.forEach(question => {
        question.id = questionId + 1;
        question.answered = 'Not Answered';
        question.correct = 'Incorrect';
        questionId ++;
        let count = 0;
        this.options = question.options.map(option => {
          count ++;
          return {selected : false , name: option  , id:count};
        });
        question.options = this.options;
      });
    });
  }

  get filteredQuestions() {
    return (this.questions) ?
      this.questions.slice(this.page.index, this.page.index + this.page.size) : [];
  }

  goToPrev() {
    this.page.index --;
  }

  goToNext() {
    this.page.index ++;
  }

  onSelect(question , option , answer , index) {
    question.answered = 'answered';
    let pageIndex = this.page.index;
    let id = question.id;
    question.correct = index === answer ? 'correct' : 'incorrect';
    question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
  }

  onSubmit() {
    this.showResult = true;
    this.valueChange.emit('Show Result');
  }

  getColor(question) {
    let color = question.correct === 'correct' ? 'green' : 'red';
    this.result = question.correct === 'correct' ? 'correct' : question.answered === 'answered' ? 'Incorrect' : 'Not answered';
    return color;
  }

}
