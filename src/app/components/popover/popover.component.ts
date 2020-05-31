import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }
  ngOnInit() {
  }

  Save() {
    this.popoverCtrl.dismiss({selectedItem: 'save'});
  }

  Export() {
    this.popoverCtrl.dismiss({selectedItem: 'export'});
  }

  close() {
    this.popoverCtrl.dismiss({selectedItem: 'close'});
  }

}
