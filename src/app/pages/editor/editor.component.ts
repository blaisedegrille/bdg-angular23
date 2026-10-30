import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

import { Editor } from 'ngx-editor';

/* const editor = new EditorJS({
  holder: 'editorjs',
  tools: {
    header: Header,
  },
}); */

const config = {
  holder: 'editorjs',
  inlineToolbar: ['link', 'marker', 'bold', 'italic'],
  // inlineToolbar: true,
  autofocus: true,
  placeholder: 'Let`s write an awesome story!',
  tools: {
    header: Header,
    list: List,
  },
};

@Component({
  standalone: false,
  selector: 'ang23-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  // @ViewChild(EditorJS) editor: EditorJS = new EditorJS('editorjs');
  @ViewChild(EditorJS) editor: EditorJS = new EditorJS(config);

  ngx_editor!: Editor;
  html = '';

  ngOnInit(): void {
    this.ngx_editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.ngx_editor.destroy();
  }
}
