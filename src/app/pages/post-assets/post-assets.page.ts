import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/photo.modal';
import { ModalController } from '@ionic/angular';
import { ImagePage } from '../modal/image/image.page';

@Component({
  selector: 'app-post-assets',
  templateUrl: './post-assets.page.html',
  styleUrls: ['./post-assets.page.scss'],
})
export class PostAssetsPage implements OnInit {
  private assetType = 'post';
  constructor(public photoService: PhotoService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.photoService.postPhotos = [];
    this.photoService.loadAssets(this.assetType);
  }

  async presentImage(image: Photo) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { photo: image, assetType: this.assetType }
    });
    return await modal.present();
  }
}
