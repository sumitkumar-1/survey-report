import { ProjectAssets } from './../interfaces/projectassets';
import { ProjectDetails } from './../interfaces/projectdetails';
import { Injectable, Inject } from '@angular/core';
import { Project } from './../interfaces/project';
import { PersistentService } from './persistent.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class ProjectService {

  constructor(private persistentService: PersistentService) { }

  /* create project */
  public addProject(projectdata: Project, db: SQLiteObject) {
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
    // tslint:disable-next-line: max-line-length
    return db.executeSql('INSERT INTO pm_projects (projectname, market, siteid, sitename, contractor, startdate, installation, onsitetech, additionalnotes, sourcelogopath, targetlogopath) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data);
  }
  /* add project details */
  public addProjectDetails(projectdetaildata: ProjectDetails) {
    const data = [
      projectdetaildata.projectid,
      projectdetaildata.aspname,
      projectdetaildata.completeddate,
      projectdetaildata.shift,
      projectdetaildata.currentstatus,
      projectdetaildata.e911completed,
      projectdetaildata.srscompleted,
      projectdetaildata.usedlongcable,
      projectdetaildata.dulasset,
      projectdetaildata.dusserial,
      projectdetaildata.dulasset,
      projectdetaildata.dulserial,
      projectdetaildata.xmuasset,
      projectdetaildata.xmuserial,
      projectdetaildata.installedserial,
      projectdetaildata.installedasset
    ];

    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        // tslint:disable-next-line: max-line-length
        db.executeSql('INSERT INTO pm_project_details (id, projectid, aspname, completeddate, shift, currentstatus, e911completed, srscompleted, usedlongcable, dusasset, dusserial, dulasset, dulserial, xmuasset, xmuserial, installedserial, installedasset) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(res => {
          return 'Success: projectDetails - ' + projectdetaildata.projectid + ' added sucessfully !!';
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }

  /* add project assets */
  public addProjectAssets(projectassetdata: ProjectAssets) {
    const data = [
      projectassetdata.projectid,
      projectassetdata.assettype,
      projectassetdata.assetpath
    ];
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        db.executeSql('INSERT INTO pm_project_assets (projectid, assettype, assetpath) VALUES (?, ?, ?)', data).then(res => {
          return 'Success: projectAsset - ' + projectassetdata.projectid + ' added sucessfully !!';
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }

  /* update project */
  public updateProject(projectdata: Project) {
    const data = [
      projectdata.projectname,
      projectdata.sitename
    ];

    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        db.executeSql(`UPDATE pm_projects SET projectname = ?, sitename = ? WHERE id = ${projectdata.id}`, data).then(() => {
          return 'Success: project - ' + projectdata.id + ' updated sucessfully !!';
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }

  /* update project details */
  public updateProjectDetails(projectdata: ProjectDetails) {
    const data = [
      projectdata.aspname,
      projectdata.currentstatus
    ];
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        db.executeSql(`UPDATE pm_projects SET aspname = ?, currentstatus = ? WHERE id = ${projectdata.id}`, data).then(() => {
          return 'Success: project - ' + projectdata.projectid + ' updated sucessfully !!';
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }

  /* delte project */
  public deleteProject(projectid: number) {
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        db.executeSql('DELETE FROM pm_projects WHERE id = ?', [projectid]).then(_ => {
          return 'Success: Project - ' + projectid + ' removed !!';
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }

  /* get all projects */
  public getProjects(db: SQLiteObject) {
    return db.executeSql('SELECT * FROM pm_projects', []);
  }

  /* get single project */
  public getProject(projectid: number) {
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        db.executeSql('SELECT * FROM pm_projects WHERE id = ?', [projectid]).then(res => {
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
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }

  /* get all project details */
  public getProjectDetails() {
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        db.executeSql('SELECT * FROM pm_project_details', []).then(res => {
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
          return items;
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }

  /* get all project details */
  public getProjectAssets() {
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        db.executeSql('SELECT * FROM pm_project_assets', []).then(res => {
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
          return items;
        }).catch((err) => {
          console.log('DbError: ' + err);
        });
      }
    });
  }
}
