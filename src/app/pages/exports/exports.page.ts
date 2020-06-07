import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { PersistentService } from 'src/app/services/persistent.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.page.html',
  styleUrls: ['./exports.page.scss'],
})
export class ExportsPage implements OnInit {

  public exportFiles: any[] = [];

  constructor(private file: File,
    private persistentService: PersistentService,
    private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.getallExcelFiles();
  }

  getallExcelFiles() {
    this.file.listDir(this.persistentService.getStorageDir(), this.persistentService.getStorageSaveDir()).then((dirlist) => {
      for (let i = 0; i < dirlist.length; i++) {
        this.file.checkDir(dirlist[i].nativeURL, 'export').then((res) => {
          this.file.listDir(dirlist[i].nativeURL, 'export').then((files) => {
            for (let j = 0; j < files.length; j++) {
              const filename = files[j].nativeURL.substr(files[j].nativeURL.lastIndexOf('/') + 1);
              const extension = filename.substr(filename.lastIndexOf('.') + 1);
              if (extension === 'xlsx') {
                console.log('Excel File = ' + files[j].nativeURL);
                this.exportFiles.push({ name: filename, path: files[j].nativeURL });
              }
            }
          }).catch((err) => {
            console.log('No Export Present !!');
          });
        }).catch((err) => {
          console.log('Not a directory');
        });
      }
    }).catch((err) => {
      console.log('Can not read Directory');
    });
  }

  shareFile(fileNamewithpath: string) {
    console.log('Sharing File ' + fileNamewithpath);
    // tslint:disable-next-line: max-line-length
    this.socialSharing.share('Hi,\nplease find the attached Autogenerated COP Report !!\n\nRegards\nAjay', 'COP Report', fileNamewithpath).then((res) => {
      alert('File Shared SuccessFully !!');
    }).catch((err) => {
      console.log('Failed to Share !!');
    });
  }

}
