import { Component, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

export interface jsonFormat {
  name: string;
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  formGroup: FormGroup;
  post: any = '';
  title = 'material-proj1';
  
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate()
  }

  createForm() {
    this.formGroup = new FormGroup({
      dataRequestText : new FormControl('', [Validators.required]),
      requestTypeControl : new FormControl('', [Validators.required]),
      sourceDataFormatControl : new FormControl('', [Validators.required]),
      destDataFormatControl : new FormControl('', [Validators.required]),
      sourcePath : new FormControl(),
      destinationPath : new FormControl(),
      description : new FormControl()
    });
  }

  setChangeValidate(){

  }

  requestTypesList: jsonFormat[] = [
    { name: 'New data set', id: 'newData' },
    { name: 'Existing data backup', id: 'existingData' },
    { name: 'Data with masking', id: 'maskData' }
  ];

  dataFormatList: jsonFormat[] = [
    { name: 'Flat file', id: 'flat' },
    { name: 'XML', id: 'xml' },
    { name: 'JSON', id: 'json' },
    { name: 'Database', id: 'database' }
  ];

  getTextErrorMessage() {
    return this.formGroup.get('dataRequestText').hasError('required') ? 'Please enter the data request from' : '';
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit(post: any) {
    this.post = post;
  }

}