import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-post-assets',
  templateUrl: './post-assets.page.html',
  styleUrls: ['./post-assets.page.scss'],
})
export class PostAssetsPage implements OnInit {
  // data = {
  //   grid: false
  // };
  constructor(public photoService: PhotoService) {
  }

  ngOnInit() {
    this.photoService.loadSaved();
  }

  // toggeleView() {
  //   this.data.grid = !this.data.grid;
  // }
}
