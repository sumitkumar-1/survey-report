import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Project } from '../interfaces/project';
import { File } from '@ionic-native/file/ngx';

@Injectable()
export class PersistentService {

  constructor(private file: File) { }

  dbDataSource: BehaviorSubject<SQLiteObject> = new BehaviorSubject<SQLiteObject>(null);
  isDbReadyDataSource: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);
  currentProjectInfo: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);

  updateDbDataSource(sqLiteObject: SQLiteObject) {
    this.dbDataSource.next(sqLiteObject);
  }

  updateIsDbReadyDataSource(status: Boolean) {
    this.isDbReadyDataSource.next(status);
  }

  updateCurrentProjectInfo(projectdata: Project) {
    this.currentProjectInfo.next(projectdata);
  }

  getStorageDir() {
    return this.file.externalApplicationStorageDirectory;
  }

  getStorageSaveDir() {
    return 'sitesurvey';
  }
}
