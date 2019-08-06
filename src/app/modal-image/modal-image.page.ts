import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { ParametresPage } from '../components/parametres/parametres.page';
import { ComptePage } from '../compte/compte.page';
import { ConfidentialComponent } from './confidential/confidential.component';
import { MesCartesComponent } from './mes-cartes/mes-cartes.component';
import { MaCollectionPage } from '../ma-collection/ma-collection.page';
import { SearchHistoryComponent } from './search-history/search-history.component';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.page.html',
  styleUrls: ['./modal-image.page.scss'],
})
export class ModalImagePage implements OnInit {

  color: string = '#ff7507';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal(){
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

  async showLogout(component: string) {
    const modal = await this.modalCtrl.create({
        component: component,
    });
    return await modal.present();
  }
  
}
