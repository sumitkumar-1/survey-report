import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-create-excel',
  templateUrl: './create-excel.page.html',
  styleUrls: ['./create-excel.page.scss'],
})
export class CreateExcelPage implements OnInit {

  constructor(private file: File, private excelService: ExcelService) { }

  ngOnInit() {
    this.readData();
  }

  readData() {
    const path = this.file.applicationStorageDirectory + 'sitesurvey';
    this.file.readAsDataURL(path, '1.png').then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }

}
