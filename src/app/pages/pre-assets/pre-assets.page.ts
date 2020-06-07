import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/photo.modal';
import { ModalController } from '@ionic/angular';
import { ImagePage } from '../modal/image/image.page';

@Component({
  selector: 'app-pre-assets',
  templateUrl: './pre-assets.page.html',
  styleUrls: ['./pre-assets.page.scss'],
})
export class PreAssetsPage implements OnInit {
  private assetType = 'pre';
  constructor(public photoService: PhotoService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.photoService.prePhotos = [];
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
