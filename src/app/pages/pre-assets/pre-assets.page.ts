import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PhotoService } from 'src/app/services/photo.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-pre-assets',
  templateUrl: './pre-assets.page.html',
  styleUrls: ['./pre-assets.page.scss'],
})
export class PreAssetsPage implements OnInit {

  photo: SafeResourceUrl;
  isList = true;
  items: any;
  data = {
    grid: false
  };
  images: SafeResourceUrl[];
  constructor(private sanitizer: DomSanitizer, public photoService: PhotoService) {
    this.items = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
      { id: 34 },
      { id: 35 },
      { id: 36 },
      { id: 37 },
      { id: 38 },
      { id: 39 },
      { id: 40 },
      { id: 41 },
      { id: 42 },
      { id: 43 },
      { id: 44 },
      { id: 45 },
      { id: 46 },
      { id: 47 },
      { id: 48 },
      { id: 49 },
      { id: 50 }
    ];
    this.images = [];
  }

  ngOnInit() {
    this.photoService.loadSaved();
  }

  toggeleView() {
    this.isList = !this.isList;
    this.data.grid = !this.data.grid;
  }

  // async takePicture() {
  //   const image = await Plugins.Camera.getPhoto({
  //     quality: 100,
  //     resultType: CameraResultType.Uri,
  //     saveToGallery: true,
  //     height: 200
  //   });

  //   this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  //   this.images.push(this.photo);
  // }

}
