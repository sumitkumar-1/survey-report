import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.page.html',
  styleUrls: ['./project-overview.page.scss'],
})
export class ProjectOverviewPage implements OnInit {
  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController,
    private excelService: ExcelService) { }
  ngOnInit() {
  }

  async presentPopover(myEvent) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: myEvent,
      translucent: true
    });
    popover.present();
    return popover.onDidDismiss().then(
      (data: any) => {
        try {
          if (data.data.selectedItem === 'save') {
            this.Save();
          } else if (data.data.selectedItem === 'export') {
            this.Export();
          } else if (data.data.selectedItem === 'close') {
            this.Close();
          }
        } catch (error) {
          console.log('outside');
        }
      });
  }
  Save() {
    console.log('parent: Save');
    this.excelService.init();
  }
  Export() {
    console.log('parent: Export');
  }

  Close() {
    console.log('parent: Close');
  }

}
