import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interfaces/project';
import { PersistentService } from 'src/app/services/persistent.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  public onProjectCreateForm: FormGroup;
  public project: Project;

  constructor(private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private persistentService: PersistentService,
    private file: File,
    public navCtrl: NavController) { }

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
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        this.projectService.addProject(this.project, db).then(res => {
          alert('Success: project - ' + res.insertId + ' added sucessfully !!');
          this.createProjectStorage(this.project.projectname + '-' + res.insertId);
          this.navCtrl.navigateRoot('/projects');
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }

  private async createProjectStorage(projectName: string) {
    // ---surveysite
    //    ---projectname-id
    //       ---pre
    //       ---post
    //       ---export
    //    ---projectname-id
    //       ---pre
    //       ---post
    //       ---export
    await this.createDirectory(this.persistentService.getStorageDir(), this.persistentService.getStorageSaveDir());
    await this.createDirectory(this.persistentService.getStorageDir(), this.persistentService.getStorageSaveDir() + '/' + projectName);
    await this.createDirectory(this.persistentService.getStorageDir(),
      this.persistentService.getStorageSaveDir() + '/' + projectName + '/pre');
    await this.createDirectory(this.persistentService.getStorageDir(),
      this.persistentService.getStorageSaveDir() + '/' + projectName + '/post');
    await this.createDirectory(this.persistentService.getStorageDir(),
      this.persistentService.getStorageSaveDir() + '/' + projectName + '/export');
  }

  private async createDirectory(path: string, dirname: string) {
    await this.file.checkDir(path, dirname).then(() => {
      console.log('Directory ' + dirname + ' exists !!');
    }).catch(() => {
      console.log('Directory ' + dirname + ' does not exists !!, creating it !!');
      this.file.createDir(path, dirname, false).then(() => {
        console.log('Directory ' + dirname + ' Created Sucessfully !!');
      }).catch(() => {
        console.log('Failed to Create ' + dirname + ' Directory !!');
      });
    });
  }
}
