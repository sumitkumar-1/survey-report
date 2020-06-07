import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { PersistentService } from 'src/app/services/persistent.service';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { ProjectService } from '../../services/project.service';
import { Users } from 'src/app/interfaces/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private dbService: DbService,
    private persistentService: PersistentService,
    private projectService: ProjectService,
    private sqLitePorter: SQLitePorter,
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    this.dbService.seedDb().then((db: SQLiteObject) => {
      this.persistentService.updateDbDataSource(db);
      this.dbService.bootstrapdb().subscribe((sql) => {
        this.sqLitePorter.importSqlToDb(db, sql).then(() => {
          this.persistentService.updateIsDbReadyDataSource(true);
          this.projectService.getUsers(db).then((users) => {
            const email = this.onLoginForm.get('email').value;
            const password = this.onLoginForm.get('password').value;
            let loggedin = false;
            if (users.rows.length > 0) {
              for (let i = 0; i < users.rows.length; i++) {
                if (users.rows.item(i).uemail === email && users.rows.item(i).upassword === password) {
                  loggedin = true;
                  const udata: Users = {
                    id: users.rows.item(i).id,
                    username: users.rows.item(i).username,
                    email: users.rows.item(i).uemail,
                    password: users.rows.item(i).upassword
                  };
                  this.persistentService.updateUserDetails(udata);
                  this.navCtrl.navigateRoot('/projects');
                }
              }
            }
            if (!loggedin) {
              alert('Invalid Username or Password !!');
            }
          }).catch((err) => {
            console.log('No User Present !!');
          });
        }).catch(error => alert('LoginPage: unable to create tables' + error));
      });
    }).catch(error => alert('LoginPage: unable to database' + error));
  }
}
