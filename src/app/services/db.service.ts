import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class DbService {

  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.seedDb();
  }

  public seedDb() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'surveyreport.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.storage = db;
        this.bootstrapdb();
      }).catch(error => alert('db service constructor error' + error));
    });
  }

  private bootstrapdb() {
    this.httpClient.get(
      'assets/db/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  getStorage() {
    return this.storage;
  }

}
