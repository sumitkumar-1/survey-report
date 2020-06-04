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
  public addProjectDetails(projectdetaildata: ProjectDetails, db: SQLiteObject) {
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

    // tslint:disable-next-line: max-line-length
    return db.executeSql('INSERT INTO pm_project_details (id, projectid, aspname, completeddate, shift, currentstatus, e911completed, srscompleted, usedlongcable, dusasset, dusserial, dulasset, dulserial, xmuasset, xmuserial, installedserial, installedasset) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data);
  }

  /* add project assets */
  public addProjectAssets(projectassetdata: ProjectAssets, db: SQLiteObject) {
    const data = [
      projectassetdata.projectid,
      projectassetdata.assettype,
      projectassetdata.assetpath
    ];
    return db.executeSql('INSERT INTO pm_project_assets (projectid, assettype, assetpath) VALUES (?, ?, ?)', data);
  }

  /* update project */
  public updateProject(projectdata: Project, db: SQLiteObject) {
    const data = [
      projectdata.projectname,
      projectdata.sitename
    ];
    return db.executeSql(`UPDATE pm_projects SET projectname = ?, sitename = ? WHERE id = ${projectdata.id}`, data);
  }

  /* update project details */
  public updateProjectDetails(projectdata: ProjectDetails, db: SQLiteObject) {
    const data = [
      projectdata.aspname,
      projectdata.currentstatus
    ];
    return db.executeSql(`UPDATE pm_projects SET aspname = ?, currentstatus = ? WHERE id = ${projectdata.id}`, data);
  }

  /* delte project */
  public deleteProject(projectid: number, db: SQLiteObject) {
    return db.executeSql('DELETE FROM pm_projects WHERE id = ?', [projectid]);
  }

  /* get all projects */
  public getProjects(db: SQLiteObject) {
    return db.executeSql('SELECT * FROM pm_projects', []);
  }

  /* get single project */
  public getProject(projectid: number, db: SQLiteObject) {
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

  /* get all project details */
  public getProjectDetails(db: SQLiteObject) {
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

  /* get all project details */
  public getProjectAssets(projectid: number, assettype: string, db: SQLiteObject) {
    return db.executeSql('SELECT * FROM pm_project_assets where projectid = ? and assettype = ?', [projectid, assettype]);
  }
}
