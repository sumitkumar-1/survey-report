import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { ProjectAssets } from './../interfaces/projectassets';
import { ProjectDetails } from './../interfaces/projectdetails';
import { Project } from './../interfaces/project';

@Injectable()
export class ExcelService {
  // Excel Template Details
  private PROJECT_TEMPLATE = 'XX_COP_TEMPLATE.xlsx';
  private TEMPLATE_WORKSHEETS = ['Summary', 'PRE PICTURES', 'POST PICTURES', 'CT'];

  // Export Data directory
  private sourceDir = 'public/assets/template/';
  private destpath: any;
  private exportFileName;
  private proj: Project;

  constructor(private platform: Platform, private file: File) {
    // this.platform.ready().then(() => {
    //  console.log('Excel-Service::' + this.file.dataDirectory);
    //  alert(this.file.dataDirectory);
    //  this.file.checkFile(this.file.applicationDirectory + 'public/assets/template/', 'XX_COP_TEMPLATE.xlsx').then(res => {
    //    alert('sumit1' + res);
    //  }).catch((err) => {
    //    alert('sumit2' + err);
    //  });
    //  console.log(this.file.applicationDirectory + 'public/assets/template/' + 'XX_COP_TEMPLATE.xlsx');
    //  alert(this.file.applicationDirectory + 'public/assets/template/' + 'XX_COP_TEMPLATE.xlsx');
    // });
    this.generateReport();
    // this.checkready();
  }

  public async test() {
    const path = this.file.applicationDirectory + 'public/assets/template/';
    const bstr: string = await this.file.readAsBinaryString(path, this.PROJECT_TEMPLATE);
    alert('Success');
  }

  public async checkready() {
    await this.platform.ready();
    // console.log('excel service');
    // console.log('Sumit ' + this.file.dataDirectory);
    this.destpath = {
      android: this.file.applicationStorageDirectory + 'sitesurvey/', ios: this.file.documentsDirectory + 'sitesurvey/',
      desktop: this.file.dataDirectory + 'sitesurvey/'
    };
    console.log(this.sourceDir + this.PROJECT_TEMPLATE);
    this.generateReport();
  }

  public async generateReport() {
    const path = this.file.applicationDirectory + 'public/assets/template/';
    alert('inside');
    this.file.readAsBinaryString(path, this.PROJECT_TEMPLATE).then((res) => {
      alert(res);
      console.log('success');
    }).catch((err) => {
      alert('Error ' + err);
      console.log('Failed');
    });
    console.log('Finised');
    // const filename = path + this.PROJECT_TEMPLATE;
    // const wb = XLSX.readFile(filename);
    // const bstr: string = await this.file.readAsBinaryString(path, this.PROJECT_TEMPLATE);
    // console.log('Sumit' + bstr);
    // const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
    // const sheetnames = wb.SheetNames;
    // console.log('Sumit' + sheetnames);
    // alert(sheetnames[0]);
    // alert('final1');
    // alert('final' + sheetnames);
  }
}
