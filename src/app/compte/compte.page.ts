import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { EditProfilComponent } from '../modal-image/edit-profil/edit-profil.component';
import {UserModel} from '../models/user.model';
import {Storage} from '@ionic/storage';

/*
export class Personne {
  id_user?: number;
  nom?: string;
  email?: string;
  telephone?: string;
  nom_rofil?:string;
  photos?: string[];
  prenoms?: string;
  password?: string;
  date_inscription?: string;
  statut?: number;
  level?: number;
}
*/

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  profil: UserModel;

  constructor(private modalCtrl: ModalController,
              private camera: Camera , private alerteCtrl: AlertController,
              private storage: Storage) { }
              ionViewWillEnter() {
           this.storage.get('access_data').then(resp => {
             this.profil = resp;
             console.log(this.profil);
           });

              }

  ngOnInit() {

    /*this.profil = {
      id_user:1,
      nom: 'YAO',
      email:'sylvain.yao@toget.pro',
      telephone:'+22507344680',
      photos: ['assets/image/1.jpg'],
      nom_rofil:'YAO Kouamé sylvain',
      prenoms:'Kouamé sylvain',
      statut:1
    };*/
  }
  
  closeModal(){
    this.modalCtrl.dismiss();
  }


  async editProfi(to_edit: string) {
    const modal = await this.modalCtrl.create({
        component: EditProfilComponent,
        componentProps: {
          'profil': this.profil,
          'edit': to_edit
        }
    });
    return await modal.present();
  }

  public async onTackPicture(){
  const  options1 : CameraOptions = {
      quality : 50,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.CAMERA,
    allowEdit: true
  };
  const  options2: CameraOptions = {
    quality : 50,
    destinationType : this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType : this.camera.MediaType.PICTURE,
    sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit: true
  };
    let alert = await this.alerteCtrl.create({
      header: 'Confirmation',
      message: 'Source?',
      buttons: [
        { text : 'Camera',
         handler : () => {
           this.getPicture(options1);
         }
        },
        {
      text : 'Librairie',
          handler: () => {
            this.getPicture(options2);
          }
        }
          ]
    });

       await alert.present();
  }
  private  getPicture(params: CameraOptions){
    this.camera.getPicture(params).then(data => {
      let base64Image = 'data:image/jpeg;base64,' + data;
      this.profil.photos = base64Image;
      this.storage.get('access_data').then(resp => {
          base64Image = resp;
          this.storage.set('access_data', base64Image);
          console.log('OK', base64Image);
      });

  });
  }
}
