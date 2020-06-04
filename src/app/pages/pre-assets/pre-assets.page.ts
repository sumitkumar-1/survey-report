import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-pre-assets',
  templateUrl: './pre-assets.page.html',
  styleUrls: ['./pre-assets.page.scss'],
})
export class PreAssetsPage implements OnInit {
  constructor(public photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.loadAssets('pre');
  }
}
