import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { QuestionBase } from '../dynamic-form/question/question-base';
import { QuestionService } from '../dynamic-form/question/question.service';

@Component({
  standalone: false,
  selector: 'ang23-base-edit-form',
  templateUrl: './base-edit-form.component.html',
  styleUrls: ['./base-edit-form.component.scss'],
  providers: [QuestionService],
})
export class BaseEditFormComponent implements OnInit {
  public form!: FormGroup;

  // Base Form
  questions$: Observable<QuestionBase<any>[]>;

  constructor(
    private readonly questionService: QuestionService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BaseEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.questions$ = questionService.getQuestions(data);
  }

  ngOnInit(): void {
    /*     this.form = this.fb.group({
      id: this.fb.control(this.data.id, []),
      name: this.fb.control(this.data.name, []),
      email: this.fb.control(this.data.email, []),
    });

    console.log('this.form: ', this.form);
    console.log('this.data: ', this.data); */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
