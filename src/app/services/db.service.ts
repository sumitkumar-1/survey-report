import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class DbService {
  constructor(
    private sqlite: SQLite,
    private httpClient: HttpClient
  ) { }

  public seedDb(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'surveyreport.db',
      location: 'default'
    });
  }

  public bootstrapdb(): Observable<string> {
    return this.httpClient.get('assets/db/dump.sql', { responseType: 'text' });
  }
}
