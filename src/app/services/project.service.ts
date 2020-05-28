import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { ProjectAssets } from './../interfaces/projectassets';
import { ProjectDetails } from './../interfaces/projectdetails';
import { Injectable } from '@angular/core';
import { Project } from './../interfaces/project';
import { DbService } from './db.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable()
export class ProjectService {

  private storage: SQLiteObject;
  private projectList = new BehaviorSubject([]);
  private ProjectDetailList = new BehaviorSubject([]);
  private ProjectAssetList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'surveyreport.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.storage = db;
        alert('storage success' + this.storage);
        this.bootstrapdb();
      }).catch(error => alert('projectservice constructor1' + error));
    }).catch(error => alert('projectservice constructor2' + error));
    // this.storage = dbservice.getStorage();
  }

  bootstrapdb() {
    this.httpClient.get(
      'assets/db/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.isDbReady.next(true);
        })
        .catch(error => alert('project service bootstrapdb' + error));
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  /* return all projects */
  public fetchProjects(): Observable<Project[]> {
    this.getProjects();
    return this.projectList.asObservable();
  }

  /* return all projects */
  public fetchProjectDetails(): Observable<ProjectDetails[]> {
    this.getProjectDetails();
    return this.ProjectDetailList.asObservable();
  }

  /* return all projects */
  public fetchProjectAssets(): Observable<ProjectAssets[]> {
    this.getProjectAssets();
    return this.ProjectAssetList.asObservable();
  }

  /* create project */
  public addProject(projectdata: Project) {
    const data = [
      projectdata.projectname,
      projectdata.market,
      projectdata.siteid,
      projectdata.sitename,
      projectdata.contractor,
      projectdata.startdate,
      projectdata.installation,
      projectdata.onsitetech,
      projectdata.additionalnotes,
      projectdata.sourcelogopath,
      projectdata.targetlogopath
    ];
    // this.storage.executeSql('SELECT * FROM pm_projects');
    // tslint:disable-next-line: max-line-length
    return this.storage.executeSql('INSERT INTO pm_projects (projectname, market, siteid, sitename, contractor, startdate, installation, onsitetech, additionalnotes, sourcelogopath, targetlogopath) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data)
      .then(res => {
        alert('added successfully');
        this.getProjects();
      }).catch((reason: any) => alert('addProject executeSql' + reason));
  }

  /* add project details */
  public addProjectDetails(projectdetaildata: ProjectDetails) {

    const data = [projectdetaildata.projectid, projectdetaildata.aspname, projectdetaildata.completeddate,
    projectdetaildata.shift, projectdetaildata.currentstatus, projectdetaildata.e911completed,
    projectdetaildata.srscompleted, projectdetaildata.usedlongcable, projectdetaildata.dulasset, projectdetaildata.dusserial,
    projectdetaildata.dulasset, projectdetaildata.dulserial, projectdetaildata.xmuasset, projectdetaildata.xmuserial,
    projectdetaildata.installedserial, projectdetaildata.installedasset];

    // tslint:disable-next-line: max-line-length
    return this.storage.executeSql('INSERT INTO pm_project_details (id, projectid, aspname, completeddate, shift, currentstatus, e911completed, srscompleted, usedlongcable, dusasset, dusserial, dulasset, dulserial, xmuasset, xmuserial, installedserial, installedasset) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data)
      .then(res => {
        this.getProjectDetails();
      });
  }

  /* add project assets */
  public addProjectAssets(projectassetdata: ProjectAssets) {
    const data = [projectassetdata.projectid, projectassetdata.assettype, projectassetdata.assetpath];
    return this.storage.executeSql('INSERT INTO pm_project_assets (projectid, assettype, assetpath) VALUES (?, ?, ?)', data)
      .then(res => {
        this.getProjectAssets();
      });
  }

  /* update project */
  public updateProject(projectdata: Project) {
    const data = [projectdata.projectname, projectdata.sitename];
    return this.storage.executeSql(`UPDATE pm_projects SET projectname = ?, sitename = ? WHERE id = ${projectdata.id}`, data)
      .then(() => {
        this.getProjects();
      });
  }

  /* update project details */
  public updateProjectDetails(projectdata: ProjectDetails) {
    const data = [projectdata.aspname, projectdata.currentstatus];
    return this.storage.executeSql(`UPDATE pm_projects SET aspname = ?, currentstatus = ? WHERE id = ${projectdata.id}`, data)
      .then(() => {
        this.getProjects();
      });
  }

  /* delte project */
  public deleteProject(projectid: number) {
    return this.storage.executeSql('DELETE FROM pm_projects WHERE id = ?', [projectid])
      .then(_ => {
        this.getProjects();
      });
  }

  /* get all projects */
  public getProjects() {
    const items: Project[] = [];
    this.storage.executeSql('SELECT * FROM pm_projects', []).then(res => {
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            projectname: res.rows.item(i).projectname,
            market: res.rows.item(i).market,
            siteid: res.rows.item(i).siteid,
            sitename: res.rows.item(i).sitename,
            contractor: res.rows.item(i).contractor,
            startdate: res.rows.item(i).startdate,
            installation: res.rows.item(i).installation,
            onsitetech: res.rows.item(i).onsitetech,
            additionalnotes: res.rows.item(i).additionalnotes,
            sourcelogopath: res.rows.item(i).sourcelogopath,
            targetlogopath: res.rows.item(i).targetlogopath
          });
        }
      }
      this.projectList.next(items);
    });
    return items;
  }

  /* get single project */
  public getProject(projectid: number): Promise<Project> {
    return this.storage.executeSql('SELECT * FROM pm_projects WHERE id = ?', [projectid]).then(res => {
      return {
        id: res.rows.item(0).id,
        projectname: res.rows.item(0).projectname,
        market: res.rows.item(0).market,
        siteid: res.rows.item(0).siteid,
        sitename: res.rows.item(0).sitename,
        contractor: res.rows.item(0).contractor,
        startdate: res.rows.item(0).startdate,
        installation: res.rows.item(0).installation,
        onsitetech: res.rows.item(0).onsitetech,
        additionalnotes: res.rows.item(0).additionalnotes,
        sourcelogopath: res.rows.item(0).sourcelogopath,
        targetlogopath: res.rows.item(0).targetlogopath
      };
    });
  }

  /* get all project details */
  public getProjectDetails() {
    return this.storage.executeSql('SELECT * FROM pm_project_details', []).then(res => {
      const items: ProjectDetails[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            projectid: res.rows.item(i).projectid,
            aspname: res.rows.item(i).aspname,
            completeddate: res.rows.item(i).completeddate,
            shift: res.rows.item(i).shift,
            currentstatus: res.rows.item(i).currentstatus,
            e911completed: res.rows.item(i).e911completed,
            srscompleted: res.rows.item(i).srscompleted,
            usedlongcable: res.rows.item(i).usedlongcable,
            dusasset: res.rows.item(i).dusasset,
            dusserial: res.rows.item(i).dusserial,
            dulasset: res.rows.item(i).dulasset,
            dulserial: res.rows.item(i).dusserial,
            xmuasset: res.rows.item(i).dulasset,
            xmuserial: res.rows.item(i).dusserial,
            installedserial: res.rows.item(i).dulasset,
            installedasset: res.rows.item(i).dulasset
          });
        }
      }
      this.ProjectDetailList.next(items);
    });
  }

  /* get all project details */
  public getProjectAssets() {
    return this.storage.executeSql('SELECT * FROM pm_project_assets', []).then(res => {
      const items: ProjectAssets[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            projectid: res.rows.item(i).projectid,
            assettype: res.rows.item(i).assettype,
            assetpath: res.rows.item(i).assetpath
          });
        }
      }
      this.ProjectAssetList.next(items);
    });
  }
}
