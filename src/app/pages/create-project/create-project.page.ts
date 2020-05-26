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
  public project: any = {};

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) { }

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
    this.project.id = null;
    this.project.projectname = this.onProjectCreateForm.controls.name.value;
    this.project.market = this.onProjectCreateForm.controls.market.value;
    this.project.siteid = this.onProjectCreateForm.controls.siteid.value;
    this.project.sitename = this.onProjectCreateForm.controls.sitename.value;
    this.project.contractor = this.onProjectCreateForm.controls.contractor.value;
    this.project.startdate = this.onProjectCreateForm.controls.startdate.value;
    this.project.installation = this.onProjectCreateForm.controls.installation.value;
    this.project.onsitetech = this.onProjectCreateForm.controls.onsitetech.value;
    this.project.additionalnotes = this.onProjectCreateForm.controls.additionalnotes.value;
    this.project.sourcelogopath = this.onProjectCreateForm.controls.sourcelogopath.value;
    this.project.targetlogopath = this.onProjectCreateForm.controls.targetlogopath.value;
    this.projectService.addProject(this.project as Project);
    console.log(this.onProjectCreateForm);
  }
}
