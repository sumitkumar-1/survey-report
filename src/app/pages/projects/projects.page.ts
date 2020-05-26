import { Project } from './../../interfaces/project';
import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
import { ImagePage } from '../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { ExcelService } from './../../services/excel.service';
import { ProjectInfoPage } from '../modal/project-info/project-info.page';

@Component({
  selector: 'projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss']
})
export class ProjectsPage {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  public _projects: any;
  public selectedImage: string;
  public images: string[];
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public excelService: ExcelService
  ) {
    this.excelService.checkready();
    this.images = [
      'assets/img/projects/thumb/image1.jpg',
      'assets/img/projects/thumb/image2.jpg',
      'assets/img/projects/thumb/image3.jpg',
      'assets/img/projects/thumb/image4.jpg',
      'assets/img/projects/thumb/image5.jpg',
      'assets/img/projects/thumb/image6.jpg',
      'assets/img/projects/thumb/image7.jpg'
    ];
    this.selectedImage = this.images[Math.floor(Math.random() * this.images.length)];
    // set sample data
    this._projects =
      [
        {
          id: 1,
          projectname: 'WEBS-VCM',
          market: 'Bangalore, India',
          siteid: 'site1',
          sitename: 'sitename1',
          contractor: 'cname1',
          startdate: '24/05/2020',
          installation: 'inst',
          onsitetech: 'onsite',
          additionalnote: 'addnote',
          sourcelogo: 'srclogo',
          targetlogo: 'trgtlogo'
        },
        {
          id: 2,
          projectname: 'SPDE',
          market: 'San Francisco, California',
          siteid: 'site12',
          sitename: 'sitename12',
          contractor: 'cname12',
          startdate: '25/05/2020',
          installation: 'inst2',
          onsitetech: 'onsite2',
          additionalnote: 'addnote2',
          sourcelogo: 'srclogo2',
          targetlogo: 'trgtlogo2'
        },
        {
          id: 3,
          projectname: 'BT MARIGOLD E2E',
          market: 'London, England',
          siteid: 'site13',
          sitename: 'sitename13',
          contractor: 'cname13',
          startdate: '26/05/2020',
          installation: 'inst3',
          onsitetech: 'onsite3',
          additionalnote: 'addnote3',
          sourcelogo: 'srclogo3',
          targetlogo: 'trgtlogo3'
        },
        {
          id: 4,
          projectname: 'SINEMA E',
          market: 'Brazil, South America',
          siteid: 'site14',
          sitename: 'sitename14',
          contractor: 'cname14',
          startdate: '27/05/2020',
          installation: 'inst4',
          onsitetech: 'onsite4',
          additionalnote: 'addnote4',
          sourcelogo: 'srclogo4',
          targetlogo: 'trgtlogo4'
        },
        {
          id: 5,
          projectname: 'INTERNET EDI',
          market: 'Sudan, North Africa',
          siteid: 'site15',
          sitename: 'sitename15',
          contractor: 'cname15',
          startdate: '28/05/2020',
          installation: 'inst5',
          onsitetech: 'onsite5',
          additionalnote: 'addnote5',
          sourcelogo: 'srclogo5',
          targetlogo: 'trgtlogo5'
        }
      ];
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }
  async projectInfo() {
    const modal = await this.modalCtrl.create({
      // component: SearchFilterPage
      component: ProjectInfoPage
    });
    return await modal.present();
  }
  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  // view trip detail
  async viewDetail(id) {
    // this.nav.push(ProjectDetailPage, {id: id});
  }
  goToCreateProject() {
    this.navCtrl.navigateRoot('/create-project');
  }

}
