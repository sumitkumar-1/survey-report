import { ExcelService } from 'src/app/services/excel.service';
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
import { ProjectInfoPage } from '../modal/project-info/project-info.page';
import { ProjectService } from 'src/app/services/project.service';
import { PersistentService } from 'src/app/services/persistent.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss']
})
export class ProjectsPage {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  public _projects: Project[];
  public selectedImage: string;
  public images: string[];
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private projectService: ProjectService,
    private persistentService: PersistentService,
    private excelService: ExcelService,
    private router: Router
  ) {
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
          startdate: new Date('05/24/2020').toLocaleDateString(),
          installation: 'inst',
          onsitetech: 'onsite',
          additionalnotes: 'addnote',
          sourcelogopath: 'srclogo',
          targetlogopath: 'trgtlogo'
        },
        {
          id: 2,
          projectname: 'SPDE',
          market: 'San Francisco, California',
          siteid: 'site12',
          sitename: 'sitename12',
          contractor: 'cname12',
          startdate: new Date('05/25/2020').toLocaleDateString(),
          installation: 'inst2',
          onsitetech: 'onsite2',
          additionalnotes: 'addnote2',
          sourcelogopath: 'srclogo2',
          targetlogopath: 'trgtlogo2'
        },
        {
          id: 3,
          projectname: 'BT MARIGOLD E2E',
          market: 'London, England',
          siteid: 'site13',
          sitename: 'sitename13',
          contractor: 'cname13',
          startdate: new Date('05/26/2020').toLocaleDateString(),
          installation: 'inst3',
          onsitetech: 'onsite3',
          additionalnotes: 'addnote3',
          sourcelogopath: 'srclogo3',
          targetlogopath: 'trgtlogo3'
        },
        {
          id: 4,
          projectname: 'SINEMA E',
          market: 'Brazil, South America',
          siteid: 'site14',
          sitename: 'sitename14',
          contractor: 'cname14',
          startdate: new Date('05/27/2020').toLocaleDateString(),
          installation: 'inst4',
          onsitetech: 'onsite4',
          additionalnotes: 'addnote4',
          sourcelogopath: 'srclogo4',
          targetlogopath: 'trgtlogo4'
        },
        {
          id: 5,
          projectname: 'INTERNET EDI',
          market: 'Sudan, North Africa',
          siteid: 'site15',
          sitename: 'sitename15',
          contractor: 'cname15',
          startdate: new Date('05/28/2020').toLocaleDateString(),
          installation: 'inst5',
          onsitetech: 'onsite5',
          additionalnotes: 'addnote5',
          sourcelogopath: 'srclogo5',
          targetlogopath: 'trgtlogo5'
        }
      ];
    this.persistentService.dbDataSource.subscribe((db: SQLiteObject) => {
      if (db !== null) {
        this.projectService.getProjects(db).then(res => {
          const items: Project[] = [];
          if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
              items.push({
                id: res.rows.item(i).id,
                projectname: res.rows.item(i).projectname,
                market: res.rows.item(i).market,
                siteid: res.rows.item(i).siteid,
                sitename: res.rows.item(i).sitename,
                contractor: res.rows.item(i).contractor,
                startdate: new Date(res.rows.item(i).startdate).toLocaleDateString(),
                installation: res.rows.item(i).installation,
                onsitetech: res.rows.item(i).onsitetech,
                additionalnotes: res.rows.item(i).additionalnotes,
                sourcelogopath: res.rows.item(i).sourcelogopath,
                targetlogopath: res.rows.item(i).targetlogopath
              });
            }
            this._projects = this._projects.concat(items);
          }
        }).catch((err) => {
          console.log('DbError: ' + err);
          alert('getProjects : ' + err);
        });
      }
    });
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
  viewProject(project: Project) {
    // this.nav.push(ProjectHomePage, {id: id});
    // this.navCtrl.navigateRoot('/project-home', {data: project});
    const navigationExtras: NavigationExtras = {
      state: {
        projectData: project
      }
    };
    this.router.navigate(['phome'], navigationExtras);
  }
  createProject() {
    this.navCtrl.navigateRoot('/create-project');
  }

}
