import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { PersistentService } from 'src/app/services/persistent.service';
import { Users } from 'src/app/interfaces/Users';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public userDetail: Users;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private persistentService: PersistentService,
    public toastCtrl: ToastController
    ) { }

  ngOnInit() {
    this.persistentService.userDetails.subscribe((data: Users) => {
      this.userDetail = data;
    });
  }

  async sendData() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Your Data was Edited!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateForward('/projects');
    });
  }

}
