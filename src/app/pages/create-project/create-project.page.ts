import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  public onProjectCreateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.onProjectCreateForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required
      ])],
      'market': [null, Validators.compose([
        Validators.required
      ])],
      'siteid': [null, Validators.compose([
        Validators.required
      ])],
      'sitename': [null, Validators.compose([
        Validators.required
      ])],
      'contractor': [null, Validators.compose([
        Validators.required
      ])],
      'startdate': [null, Validators.compose([
        Validators.required
      ])],
      'installation': [null, Validators.compose([
        Validators.required
      ])],
      'onsitetech': [null, Validators.compose([
        Validators.required
      ])],
      'sourcelogopath': [null, Validators.compose([
        Validators.required
      ])],
      'targetlogopath': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

}
