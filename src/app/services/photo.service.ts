import { ProjectAssets } from './../interfaces/projectassets';
import { ProjectService } from './project.service';
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { Photo } from '../interfaces/photo.modal';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { PersistentService } from './persistent.service';
import { Project } from '../interfaces/project';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import * as watermark from 'watermarkjs';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  public prePhotos: Photo[] = [];
  public postPhotos: Photo[] = [];

  constructor(private platform: Platform,
    private file: File,
    private projectService: ProjectService,
    private base64: Base64,
    private persistentService: PersistentService) { }

  public async addNewToGallery(type: string) {
    const capturedPhoto = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
      // saveToGallery: true,
      // height: 500,
      // width: 500
      // source: CameraSource.Camera,
    });
    console.log('Image Data = ' + capturedPhoto.path);
    this.persistentService.currentProjectInfo.subscribe((projectdata: Project) => {
      const filename = capturedPhoto.path.substring(capturedPhoto.path.lastIndexOf('/') + 1);
      const newpath = this.persistentService.getStorageDir() + this.persistentService.getStorageSaveDir() + '/' +
        projectdata.projectname + '-' + projectdata.id + '/' + type + '/';
      const newfileName = new Date().getTime() + '.jpg';
      // add it to database
      const projAsset: ProjectAssets = {
        id: null,
        projectid: projectdata.id,
        assettype: type,
        assetpath: newpath + newfileName
      };
      watermark([Capacitor.convertFileSrc(capturedPhoto.path)])
        .image(watermark.text.lowerRight(new Date().toLocaleString(), '65px Arial', '#fff', 0.8))
        .then((imgsrc) => {
          // console.log('WaterMark Image = ' + imgsrc.src);
          const imgdata = this.b64toBlob(imgsrc.src.split(',')[1], 'image/jpeg');
          this.file.writeFile(newpath, newfileName, imgdata).then(() => {
            this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
              if (db != null) {
                this.projectService.addProjectAssets(projAsset, db).then((res) => {
                  alert('Success: Image - ' + res.insertId + ' added sucessfully !!');
                  if (type === 'pre') {
                    this.prePhotos.push({ id: res.insertId, filepath: projAsset.assetpath, webviewPath: '', base64: imgsrc.src });
                  } else if (type === 'post') {
                    this.postPhotos.push({ id: res.insertId, filepath: projAsset.assetpath, webviewPath: '', base64: imgsrc.src });
                  }
                }).catch((err) => {
                  console.log('DbError: ' + err);
                });
              }
            });
          }).catch((err) => {
            console.log('Error Writing Files ' + err.message);
          });
        }).catch((err) => {
          console.log('Failed to add WaterMark !!' + err);
        });
    });
  }

  private b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  public loadAssets(assettype: string) {
    if (assettype === 'pre') {
      this.prePhotos = [];
    } else if (assettype === 'post') {
      this.postPhotos = [];
    }
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db != null) {
        this.persistentService.currentProjectInfo.subscribe((projectdata: Project) => {
          this.projectService.getProjectAssets(projectdata.id, assettype, db).then(res => {
            if (res.rows.length > 0) {
              for (let i = 0; i < res.rows.length; i++) {
                this.base64.encodeFile(res.rows.item(i).assetpath).then((based64File: string) => {
                  if (assettype === 'pre') {
                    this.prePhotos.push({
                      id: res.rows.item(i).id, filepath: res.rows.item(i).assetpath,
                      webviewPath: '', base64: based64File
                    });
                  } else if (assettype === 'post') {
                    this.postPhotos.push({
                      id: res.rows.item(i).id, filepath: res.rows.item(i).assetpath,
                      webviewPath: '', base64: based64File
                    });
                  }
                }).catch((err) => {
                  console.log('Invalid Asset Path in Database');
                });
              }
            }
          }).catch((err) => {
            console.log('DbError: ' + err);
          });
        });
      }
    });
  }
}
