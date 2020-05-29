import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class PersistentService {

  constructor() { }

  dbDataSource: BehaviorSubject<SQLiteObject> = new BehaviorSubject<SQLiteObject>(null);
  isDbReadyDataSource: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);

  updateDbDataSource(sqLiteObject: SQLiteObject) {
    this.dbDataSource.next(sqLiteObject);
  }

  updateIsDbReadyDataSource(status: Boolean) {
    this.isDbReadyDataSource.next(status);
  }
}
