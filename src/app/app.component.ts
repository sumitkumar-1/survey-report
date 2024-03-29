import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { PersistentService } from './services/persistent.service';
import { Users } from './interfaces/Users';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  public userDetail: Users = { id: 0, username: '', email: '', password: '', };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private persistentService: PersistentService,
    public androidPermissions: AndroidPermissions
  ) {
    // check permissions before proceding
    this.platform.ready().then(() => {
      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.CAMERA,
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]
      );
    });

    this.appPages = [
      {
        title: 'Home',
        url: '/projects',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Exports',
        url: '/exports',
        direct: 'root',
        icon: 'document'
      },
      {
        title: 'About',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      }
    ];
    this.initializeApp();
    this.loadUserData();
  }

  loadUserData() {
    if (this.persistentService != null) {
      this.persistentService.userDetails.subscribe((data: Users) => {
        if (data != null) {
          this.userDetail = data;
        }
      });
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => { });
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }
}
