import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from './question/question-base';
import { QuestionControlService } from './question/question-control.service';

@Component({
  standalone: false,
  selector: 'ang23-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [QuestionControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  @Output()
  cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  submitted = new EventEmitter<Record<string, unknown>>();

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    if (this.form.valid) {
      const values = this.form.getRawValue() as Record<string, unknown>;
      this.payLoad = JSON.stringify(values);
      this.submitted.emit(values);
    }
  }

  onCancel() {
    this.cancel.emit(true);
  }
}
