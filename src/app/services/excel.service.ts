import { ProjectAssets } from './../interfaces/projectassets';
import { ProjectDetails } from './../interfaces/projectdetails';
import { Project } from './../interfaces/project';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class ExcelService {
  // Excel Template Details
  private PROJECT_TEMPLATE = 'XX_COP_TEMPLATE.xlsx';
  private TEMPLATE_WORKSHEETS = ['Summary', 'PRE PICTURES', 'POST PICTURES', 'CT'];

  // Export Data directory
  private sourceDir = 'assets/template/';
  private EXPORT_PATH = 'assets/exportdata/';
  private destpath: any;
  private exportFileName;

  constructor(private platform: Platform, private file: File) {
    this.checkready();
  }

  public async checkready() {
    await this.platform.ready();
    // console.log('excel service');
    // console.log('Sumit ' + this.file.dataDirectory);
    this.destpath = {
      android: this.file.applicationStorageDirectory + 'sitesurvey/', ios: this.file.documentsDirectory + 'sitesurvey/',
      desktop: this.file.dataDirectory + 'sitesurvey/'
    };
  }
}
