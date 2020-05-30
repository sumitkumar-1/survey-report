import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
// import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  // Excel Template Details
  private PROJECT_TEMPLATE_NAME = 'XX_COP_TEMPLATE.xlsx';
  private TEMPLATE_WORKSHEETS = ['Summary', 'PRE PICTURES', 'POST PICTURES', 'CT'];
  private sourceDir = 'public/assets/template/';
  private saveDir = 'sitesurvey';
  private exportFileDir: string;
  private exportFileName: string;

  constructor(private platform: Platform, private file: File) {
    this.init();
  }

  public init() {
    this.platform.ready().then(() => {
      // this.destDir = {
      //   android: this.file.applicationStorageDirectory + 'sitesurvey/',
      //   ios: this.file.documentsDirectory + 'sitesurvey/',
      //   desktop: this.file.dataDirectory + 'sitesurvey/'
      // };
      if (this.platform.is('android')) {
        console.log(this.file.applicationStorageDirectory);
        this.exportFileDir = this.file.applicationStorageDirectory + this.saveDir;
        this.file.checkDir(this.file.applicationStorageDirectory, this.saveDir).then(() => {
          console.log('Directory exists !!');
          this.generateReport();
        }).catch((err) => {
          console.log('Directory does not exists !!, creating it');
          this.file.createDir(this.file.applicationStorageDirectory, this.saveDir, false).then(() => {
            console.log('Directory Created Sucessfully !!');
          }).catch(() => {
            console.log('Failed to Create Directory !!');
          });
        });
      }
    });
  }

  public generateReport() {
    // this.file.createFile(this.exportFileDir, 'test.xlsx', false).then(() => {
    //   console.log('File Created !!');
    // }).catch((err) => {
    //   console.log('File Creation Failed !!');
    // });

    const path = this.file.applicationDirectory + 'public/assets/template/';
    this.file.readAsBinaryString('./assets/template/', this.PROJECT_TEMPLATE_NAME).then((data) => {
      console.log('Success');
      console.log(data);
    }).catch((err) => {
      console.log('Can not read template => { code=' + err.code + ', message=' + err.message + '}');
    });

    this.file.removeFile(this.exportFileDir, this.PROJECT_TEMPLATE_NAME).then(() => {
      console.log('Removed Existing File !!');
    }).catch(() => {
      console.log('Not Files to Remove !!');
    });

    // tslint:disable-next-line: max-line-length
    this.file.copyFile(path, this.PROJECT_TEMPLATE_NAME, this.exportFileDir, this.PROJECT_TEMPLATE_NAME).then(() => {
      console.log('Copy Done !!');
      this.file.moveFile(this.exportFileDir, this.PROJECT_TEMPLATE_NAME, this.exportFileDir, 'testproject.xlsx').then(() => {
        this.exportFileName = this.exportFileDir + '/testproject.xlsx';
        console.log('Rename Finished !!');
        this.readData();
      }).catch((err) => {
        console.log('Rename Failed !!' + err);
      });
    }).catch((err) => {
      console.log('copy Failed !!');
    });

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

  readData() {
    // const wb = new ExcelJS.Workbook();
    // wb.xlsx.readFile(this.exportFileName).then(() => {
    //   const ws = wb.getWorksheet(0);
    //   console.log(ws);
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
}
