import { ProjectDetails } from './../../interfaces/projectdetails';
import { ProjectService } from 'src/app/services/project.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, Platform } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { File } from '@ionic-native/file/ngx';
import * as Excel from 'exceljs';
import { Base64 } from '@ionic-native/base64/ngx';
import { PersistentService } from 'src/app/services/persistent.service';
import { Project } from 'src/app/interfaces/project';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.page.html',
  styleUrls: ['./project-overview.page.scss'],
})
export class ProjectOverviewPage implements OnInit {

  public onProjectDetailAdd: FormGroup;
  private saveDir = 'sitesurvey';
  private blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private TEMPLATE_WORKSHEETS = ['Summary', 'PRE PICTURES', 'POST PICTURES', 'CT'];
  private exportFileDir: string;
  private k: number;
  private exportFileName: string;
  private projectinfodata: Project;
  private projectdetaildata: ProjectDetails;
  private dbInfo: SQLiteObject;
  private preAssets: string[] = [];
  private postAssets: string[] = [];
  private isProjDetExists = false;

  private edit = false;
  constructor(public popoverCtrl: PopoverController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private platform: Platform,
    private base64: Base64,
    private persistentService: PersistentService,
    private projectService: ProjectService,
    private file: File) {
    this.saveDir = this.persistentService.getStorageSaveDir();
    this.projectdetaildata = {
      id: null,
      projectid: null,
      aspname: '',
      completeddate: null,
      shift: '',
      currentstatus: '',
      e911completed: '',
      srscompleted: '',
      usedlongcable: '',
      dusasset: '',
      dusserial: '',
      dulasset: '',
      dulserial: '',
      xmuasset: '',
      xmuserial: '',
      installedserial: '',
      installedasset: ''
    };
  }

  ngOnInit() {
    this.onProjectDetailAdd = this.formBuilder.group({
      aspname: [null, Validators.compose([])],
      completedate: [null, Validators.compose([])],
      shift: [null, Validators.compose([])],
      currentStatus: [null, Validators.compose([])],
      e911completed: [null, Validators.compose([])],
      srsCompleted: [null, Validators.compose([])],
      usedLongCable: [null, Validators.compose([])],
      dusAssets: [null, Validators.compose([])],
      dusSerial: [null, Validators.compose([])],
      dulAssets: [null, Validators.compose([])],
      dulSerial: [null, Validators.compose([])],
      xmuAsset: [null, Validators.compose([])],
      xmuSerial: [null, Validators.compose([])],
      installedSerial: [null, Validators.compose([])],
      installedAsset: [null, Validators.compose([])]
    });
    this.persistentService.currentProjectInfo.subscribe((project: Project) => {
      if (project !== null) {
        this.projectinfodata = project;
        this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
          if (db != null) {
            this.dbInfo = db;
            this.projectService.getProjectDetails(this.projectinfodata.id, db).then((projectDetail: any) => {
              if (projectDetail !== null && projectDetail.rows.length > 0) {
                this.isProjDetExists = true;
                this.projectdetaildata = projectDetail.rows.item(0);
                this.onProjectDetailAdd.setValue(this.projectdetaildata);
              }
            });
          }
        });
      }
    });
  }

  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: myEvent,
      translucent: true
    });
    popover.present();
    return popover.onDidDismiss().then(
      (data: any) => {
        try {
          if (data.data.selectedItem === 'save') {
            this.Save();
          } else if (data.data.selectedItem === 'export') {
            this.Export();
          } else if (data.data.selectedItem === 'close') {
            this.Close();
          }
        } catch (error) {
          console.log('outside');
        }
      });
  }

  Save() {
    if (this.projectinfodata !== null && this.projectinfodata !== undefined
      && this.dbInfo !== null && this.dbInfo !== undefined) {
      const projDetail: ProjectDetails = {
        id: null,
        projectid: this.projectinfodata.id,
        aspname: this.onProjectDetailAdd.controls.aspname.value,
        completeddate: this.onProjectDetailAdd.controls.completedate.value,
        shift: this.onProjectDetailAdd.controls.shift.value,
        currentstatus: this.onProjectDetailAdd.controls.currentStatus.value,
        e911completed: this.onProjectDetailAdd.controls.e911completed.value,
        srscompleted: this.onProjectDetailAdd.controls.srsCompleted.value,
        usedlongcable: this.onProjectDetailAdd.controls.usedLongCable.value,
        dusasset: this.onProjectDetailAdd.controls.dusAssets.value,
        dusserial: this.onProjectDetailAdd.controls.dusSerial.value,
        dulasset: this.onProjectDetailAdd.controls.dulAssets.value,
        dulserial: this.onProjectDetailAdd.controls.dulSerial.value,
        xmuasset: this.onProjectDetailAdd.controls.xmuAsset.value,
        xmuserial: this.onProjectDetailAdd.controls.xmuSerial.value,
        installedserial: this.onProjectDetailAdd.controls.installedSerial.value,
        installedasset: this.onProjectDetailAdd.controls.installedAsset.value,
      };
      try {
        if (this.isProjDetExists) {
          this.projectService.updateProjectDetails(projDetail, this.dbInfo).then((projectDetail) => {
            console.log(projectDetail);
            alert('updated successfully');
          }, (error) => { console.log(error) });
        } else {
          this.projectService.addProjectDetails(projDetail, this.dbInfo).then((projectDetail) => {
            console.log(projectDetail);
            alert('added successfully');
          }, (error) => { console.log(error) });
        }
        this.projectService.getProjectDetails(this.projectinfodata.id, this.dbInfo).then((projectDetail: any) => {
          if (projectDetail !== null && projectDetail.rows.length > 0) {
            this.isProjDetExists = true;
            this.projectdetaildata = projectDetail.rows.item(0);
            this.onProjectDetailAdd.setValue(this.projectdetaildata);
          }
        });
        this.edit = false;
      } catch (error) {
        alert(error);
      }
    }
    console.log('parent: Save');
    // code to save the project details
  }

  Export() {
    console.log('parent: Export');
    // code to generate Excel Sheet
    if (this.projectinfodata !== null && this.projectinfodata !== undefined
      && this.dbInfo !== null && this.dbInfo !== undefined
      && this.projectdetaildata !== null && this.projectdetaildata !== undefined) {
      this.exportFileName = new Date().getTime() + '_' + this.projectinfodata.siteid + '_' +
        this.projectinfodata.sitename + '_' + 'COP.xlsx';
      this.exportFileDir = this.persistentService.getStorageDir() + this.saveDir + '/'
        + this.projectinfodata.projectname + '-' + this.projectinfodata.id + '/export/';
      this.initExport();
    }
  }

  Close() {
    console.log('parent: Close');
  }

  editProjectDetails() {
    this.edit = true;
  }
  // Export Functions goes below

  private initExport() {
    if (this.platform.is('android')) {
      this.file.checkDir(this.persistentService.getStorageDir(), this.saveDir).then(() => {
        console.log('Directory exists !!');
        this.createExcel();
      }).catch((err) => {
        console.log('Directory does not exists !!, creating it ' + err.message);
        this.file.createDir(this.persistentService.getStorageDir(), this.saveDir, false).then(() => {
          console.log('Directory Created Sucessfully !!');
          this.createExcel();
        }).catch((err1) => {
          console.log('Failed to Create Directory !!' + err1.message);
        });
      });
    }
  }

  async createExcel() {
    const wb = new Excel.Workbook();

    // setting workbook property
    wb.creator = 'AutoGenerated';
    wb.lastModifiedBy = 'System';
    wb.created = new Date();
    wb.modified = new Date();
    wb.lastPrinted = new Date();

    // adding required sheets
    const summary_ws = wb.addWorksheet(this.TEMPLATE_WORKSHEETS[0], {
      properties: { tabColor: { argb: 'FF008000' } },
      views: [{ showGridLines: false }]
    });

    summary_ws.properties.defaultColWidth = 10;
    summary_ws.getRow(24).height = 50;
    summary_ws.columns = [
      { width: 20 }, { width: 20 }, { width: 30 }, { width: 20 }, { width: 30 }, { width: 15 }, { width: 15 },
      { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 },
      { width: 15 }, { width: 15 }, { width: 15 },
    ];

    const styleFontRed = { color: { argb: 'FFFF0000' } };
    const styleFontBlack = { color: { argb: 'FFFF0000' } };
    const cellBorder = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    const cellFillYellow = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' }, bgColor: { argb: 'FFFFFF00' } };
    const cellFillSkyBlue = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF87CEEB' }, bgColor: { argb: 'FF87CEEB' } };
    const cellTopBorder = { top: { style: 'thick' } };
    const cellBottomBorder = { bottom: { style: 'thick' } };
    const cellLeftBorder = { left: { style: 'thick' } };
    const cellRightBorder = { right: { style: 'thick' } };

    // rectangle border
    for (let i = 66; i < 73; i++) {
      this.createCell(summary_ws, String.fromCharCode(i) + '2', '', styleFontBlack, cellTopBorder, '');
      this.createCell(summary_ws, String.fromCharCode(i) + '21', '', styleFontBlack, cellBottomBorder, '');
    }

    for (let i = 2; i <= 21; i++) {
      this.createCell(summary_ws, 'B' + i, '', styleFontBlack, cellLeftBorder, '');
      this.createCell(summary_ws, 'H' + i, '', styleFontBlack, cellRightBorder, '');
    }

    // fill again for overlapping cells
    this.createCell(summary_ws, 'B2', '', styleFontBlack, { top: { style: 'thick' }, left: { style: 'thick' } }, '');
    this.createCell(summary_ws, 'H2', '', styleFontBlack, { top: { style: 'thick' }, right: { style: 'thick' } }, '');
    this.createCell(summary_ws, 'B21', '', styleFontBlack, { left: { style: 'thick' }, bottom: { style: 'thick' } }, '');
    this.createCell(summary_ws, 'H21', '', styleFontBlack, { right: { style: 'thick' }, bottom: { style: 'thick' } }, '');

    const projectdata = ['Market:', 'Site ID:', 'Site Name:', 'Contractor:', 'Date:', 'Project:', 'Installation:', 'On Site Tech:'];
    const projectinfo = [
      this.projectinfodata.market,
      this.projectinfodata.siteid,
      this.projectinfodata.sitename,
      this.projectinfodata.contractor,
      this.projectinfodata.startdate,
      this.projectinfodata.projectname,
      this.projectinfodata.installation,
      this.projectinfodata.onsitetech
    ];
    for (let i = 0; i < projectdata.length; i++) {
      this.createCell(summary_ws, 'D' + (i + 6).toString(), projectdata[i], styleFontRed, cellBorder, '');
      this.createCell(summary_ws, 'E' + (i + 6).toString(), projectinfo[i], styleFontBlack, cellBorder, '');
    }

    this.createCell(summary_ws, 'B17', 'Additional Notes:', styleFontBlack, cellBorder, cellFillYellow);
    this.createCell(summary_ws, 'B18', this.projectinfodata.additionalnotes, styleFontBlack, cellBorder, '');
    this.createCell(summary_ws, 'A23', 'Completion Report:', styleFontBlack, cellBorder, cellFillYellow);

    const projectdetailheader = ['Site:', 'ASP Name', 'FE Name and Number', 'Date completed', 'Shift (Day/Night)', 'Status',
      'E911 Complete', 'SRS complete', 'Used Long CPRI cable? (Yes or No)', '1st Decom DUS Serial', '1st Decom DUS Asset',
      '1st Decom DUL Serial', '1st Decom DUL Asset', 'Decom XMU Serial', 'Decom XMU Asset', 'Installed BB6630 Serial',
      'Installed BB6630 Asset'];

    const projectdatadetails = [
      this.projectinfodata.siteid,
      this.projectdetaildata.aspname,
      this.projectinfodata.onsitetech,
      this.projectdetaildata.completeddate,
      this.projectdetaildata.shift,
      this.projectdetaildata.currentstatus,
      this.projectdetaildata.e911completed,
      this.projectdetaildata.srscompleted,
      this.projectdetaildata.usedlongcable,
      this.projectdetaildata.dusserial,
      this.projectdetaildata.dusasset,
      this.projectdetaildata.dulserial,
      this.projectdetaildata.dulasset,
      this.projectdetaildata.xmuserial,
      this.projectdetaildata.xmuasset,
      this.projectdetaildata.installedserial,
      this.projectdetaildata.installedasset
    ];

    for (let i = 0; i < projectdetailheader.length; i++) {
      this.createCell(summary_ws, String.fromCharCode(65 + i) + '24', projectdetailheader[i], styleFontBlack, cellBorder, cellFillSkyBlue);
      this.createCell(summary_ws, String.fromCharCode(65 + i) + '25', projectdatadetails[i].toString(), styleFontBlack, cellBorder, '');
    }

    summary_ws.getRow(24).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    // merge cells
    summary_ws.mergeCells('B18:D18');
    summary_ws.mergeCells('B19:D19');
    summary_ws.mergeCells('B20:D20');

    const pre_ws = wb.addWorksheet(this.TEMPLATE_WORKSHEETS[1], {
      properties: { tabColor: { argb: 'FFFF0000' } },
      views: [{ showGridLines: false }]
    });

    pre_ws.mergeCells('A1:D1');
    const headerFont = { color: { argb: 'FFFF0000' }, 'size': 30, 'bold': true };
    this.createCell(pre_ws, 'A1', 'Pre Pictures', headerFont, cellBorder, cellFillYellow);
    pre_ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    const post_ws = wb.addWorksheet(this.TEMPLATE_WORKSHEETS[2], {
      properties: { tabColor: { argb: 'FF0000FF' } },
      views: [{ showGridLines: false }]
    });

    post_ws.mergeCells('A1:D1');
    this.createCell(post_ws, 'A1', 'Post Pictures', headerFont, cellBorder, cellFillYellow);
    post_ws.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    console.log(this.exportFileDir);

    await this.loadAssets('pre');
    await this.loadAssets('post');

    console.log('Total Pre Assets = ' + this.preAssets.length);
    console.log('Total Post Assets = ' + this.postAssets.length);

    await this.addAssets(this.preAssets, wb, pre_ws);
    await this.addAssets(this.postAssets, wb, post_ws);

    console.log('Saving to Excel');
    console.log('Dir = ' + this.exportFileDir);
    console.log('Filename = ' + this.exportFileName);

    // save under export.xlsx
    await wb.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: this.blobType });
      this.file.writeFile(this.exportFileDir, this.exportFileName, blob);
    }).catch((err) => {
      console.log('Unable to Create Excel File ' + err.message);
    });
    console.log('Done Create Excel');
  }

  private async addAssets(Assets: string[], workbook: Excel.Workbook, sheet: Excel.Worksheet) {
    if (Assets.length === 0) {
      return;
    }
    const max_image_per_row = 5;
    const rows = Math.ceil(Assets.length / max_image_per_row) * 15;
    const cols = max_image_per_row * 4;
    this.k = 0;
    for (let i = 2; i < rows; i += 14) {
      console.log('Processing Row = ' + i);
      await this.addColumnImage(Assets, cols, i, workbook, sheet);
    }
  }

  private async addColumnImage(Assets: string[], cols: number, i: number, workbook: Excel.Workbook, sheet: Excel.Worksheet) {
    for (let j = 0; j < cols && this.k < Assets.length; j += 4) {
      console.log('Image No = ' + this.k);
      await this.addImageToExcel(Assets[this.k], 'png', workbook,
        sheet, {
        tl: { col: j, row: i },
        ext: { width: 250, height: 250 },
        editAs: 'undefined'
      });
      console.log('Image No = ' + this.k + ' added');
      this.k = this.k + 1;
    }
  }

  public async loadAssets(assettype: string) {
    return new Promise((resolve) => {
      this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
        if (db != null) {
          this.projectService.getProjectAssets(this.projectinfodata.id, assettype, db).then(res => {
            if (res.rows.length > 0) {
              const Assets: string[] = [];
              for (let i = 0; i < res.rows.length; i++) {
                Assets.push(res.rows.item(i).assetpath);
              }
              if (assettype === 'pre') {
                this.preAssets = Assets;
              } else if (assettype === 'post') {
                this.postAssets = Assets;
              }
            }
            resolve('done');
          }).catch((err) => {
            console.log('DbError: ' + err);
          });
        }
      });
    });
  }

  private async addImageToExcel(imagePath: string, ext: any, workbook: Excel.Workbook, sheet: Excel.Worksheet, location: any) {
    await this.base64.encodeFile(imagePath).then((based64File: string) => {
      const imageId = workbook.addImage({
        base64: based64File,
        extension: ext,
      });
      sheet.addImage(imageId, location);
      console.log('Added Image = ' + imagePath);
    }).catch((err) => {
      console.log('Failed to Add Image to Excel => ' + err.message);
    });
  }

  private createCell(sheet: Excel.Worksheet, cellid: string, cellval: string, font: any, border: any, fill: any) {
    const cell = sheet.getCell(cellid);
    cell.value = cellval;
    cell.border = border;
    cell.style.font = font;
    if (fill !== '') {
      cell.fill = fill;
    }
  }
}
