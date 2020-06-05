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
  constructor(public photoService: PhotoService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.photoService.loadAssets('pre');
  }

  async presentImage(image: Photo) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image.webviewPath }
    });
    return await modal.present();
  }
}
