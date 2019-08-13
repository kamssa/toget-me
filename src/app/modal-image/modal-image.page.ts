import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import { ParametresPage } from '../components/parametres/parametres.page';
import { ComptePage } from '../compte/compte.page';
import { ConfidentialComponent } from './confidential/confidential.component';
import { MesCartesComponent } from './mes-cartes/mes-cartes.component';
import { MaCollectionPage } from '../ma-collection/ma-collection.page';
import { SearchHistoryComponent } from './search-history/search-history.component';
import {ValiderTokenService} from '../services/valider-token.service';
import {Router} from '@angular/router';
import {RegisterService} from '../services/register.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage implements OnInit {

  color: string = '#ff7507';

  constructor(private modalCtrl: ModalController,
              private validerToken: ValiderTokenService,
              private router: Router,
              private registerService: RegisterService,
              private  toastController: ToastController) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async showCartes() {
    const modal = await this.modalCtrl.create({
      component: MesCartesComponent,
    });
    return await modal.present();
  }

  async showCompte() {
    const modal = await this.modalCtrl.create({
      component: ComptePage,
    });
    return await modal.present();
  }

  async showConfidential() {
    const modal = await this.modalCtrl.create({
      component: ConfidentialComponent,
    });
    return await modal.present();
  }

  async showCollection() {
    const modal = await this.modalCtrl.create({
      component: MaCollectionPage,
    });
    return await modal.present();
  }

  async showHistory() {
    const modal = await this.modalCtrl.create({
      component: SearchHistoryComponent,
    });
    return await modal.present();
  }

  async showParams() {
    const modal = await this.modalCtrl.create({
      component: ParametresPage,
    });
    return await modal.present();
  }

  async showLogout() {
    this.registerService.logout();
    console.log('deconnexion');
    this.presentToast('Déconnexion réussie');
  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present().then(() => {
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/tabs/accueil');
    });


  }
}
