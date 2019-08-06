import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Platform} from '@ionic/angular';
import {EntreprisePage} from '../entreprise/entreprise.page';
@Injectable({
  providedIn: 'root'
})
export class OutilService {

  constructor(private photoViewer: PhotoViewer,private platform: Platform, private modalController: ModalController) { }

  getinnerHtml(html: any){
    return new Observable( 
      (observer)=>{
      observer.next({
        text:<string> html
      });
    });
  }
  
  
  openPreview(img, allData:any={}, suppr=false) {
    this.modalController.create({
      component: EntreprisePage,
      componentProps: {
        img: img,
		allData : allData,
		suppr: suppr
      }
    }).then(modal => {
      modal.present();
    });
  }
}
