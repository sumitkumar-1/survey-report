import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interfaces/project';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  public onProjectCreateForm: FormGroup;
  public project: Project;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) {
    alert('create-entry');
  }

  ngOnInit() {
    this.onProjectCreateForm = this.formBuilder.group({
      name: [null, Validators.compose([
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
      'additionalnotes': [null, Validators.compose([
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
  onCreate() {
    const d = new Date();
    this.project = {
      id: d.valueOf(),
      projectname: this.onProjectCreateForm.controls.name.value,
      market: this.onProjectCreateForm.controls.market.value,
      siteid: this.onProjectCreateForm.controls.siteid.value,
      sitename: this.onProjectCreateForm.controls.sitename.value,
      contractor: this.onProjectCreateForm.controls.contractor.value,
      startdate: this.onProjectCreateForm.controls.startdate.value,
      installation: this.onProjectCreateForm.controls.installation.value,
      onsitetech: this.onProjectCreateForm.controls.onsitetech.value,
      additionalnotes: this.onProjectCreateForm.controls.additionalnotes.value,
      sourcelogopath: this.onProjectCreateForm.controls.sourcelogopath.value,
      targetlogopath: this.onProjectCreateForm.controls.targetlogopath.value
    };
    this.projectService.addProject(this.project);
    console.log(this.onProjectCreateForm);
  }
}
