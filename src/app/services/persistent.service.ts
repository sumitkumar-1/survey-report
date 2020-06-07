import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Project } from '../interfaces/project';
import { File } from '@ionic-native/file/ngx';
import { Users } from '../interfaces/Users';

@Injectable()
export class PersistentService {

  constructor(private file: File) { }

  dbDataSource: BehaviorSubject<SQLiteObject> = new BehaviorSubject<SQLiteObject>(null);
  isDbReadyDataSource: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);
  currentProjectInfo: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
  userDetails: BehaviorSubject<Users> = new BehaviorSubject<Users>(null);

  updateDbDataSource(sqLiteObject: SQLiteObject) {
    this.dbDataSource.next(sqLiteObject);
  }

  updateIsDbReadyDataSource(status: Boolean) {
    this.isDbReadyDataSource.next(status);
  }

  updateCurrentProjectInfo(projectdata: Project) {
    this.currentProjectInfo.next(projectdata);
  }

  updateUserDetails(userdata: Users) {
    this.userDetails.next(userdata);
  }

  getStorageDir() {
    return this.file.externalApplicationStorageDirectory;
  }

  getStorageSaveDir() {
    return 'sitesurvey';
  }
}
