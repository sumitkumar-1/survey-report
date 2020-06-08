import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Photo } from 'src/app/interfaces/photo.modal';
import { File } from '@ionic-native/file/ngx';
import { PersistentService } from 'src/app/services/persistent.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ProjectService } from 'src/app/services/project.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  @Input() photo: Photo;
  @Input() assetType: string;

  constructor(
    private modalCtrl: ModalController,
    private file: File,
    private persistentService: PersistentService,
    private projectService: ProjectService,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    // console.log(this.photo);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  delete() {
    const dirName = this.photo.filepath.split('/').slice(0, -1).join('/');
    // const fileName = this.photo.filepath.split('/')[this.photo.filepath.split('/').length -1];
    const fileName = this.photo.filepath.replace(/^.*[\\\/]/, '');
    this.file.removeFile(dirName, fileName).then((res) => {
      this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
        if (db !== null) {
          this.projectService.deleteProjectAsset(this.photo.id, db).then((resp) => {
            this.photoService.prePhotos = [];
            this.photoService.postPhotos = [];
            this.photoService.loadAssets(this.assetType);
            alert('removed successfully');
          }).catch((err) => {
            alert('Error deleting asset entry ' + err.message);
          });
        }
      });
    }).catch((err) => {
      alert('Error deleting file ' + err.message);
    });
    this.modalCtrl.dismiss();
  }

}
