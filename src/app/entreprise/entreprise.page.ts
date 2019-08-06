import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {ModalController, PopoverController, NavParams, ActionSheetController } from '@ionic/angular';
import {ListeServicePage} from '../liste-service/liste-service.page';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.page.html',
  styleUrls: ['./entreprise.page.scss'],
})
export class EntreprisePage implements OnInit {
  @ViewChild('slider', { read: ElementRef })slider: ElementRef;
  // @Input() img:any;
  // @Input() allData:any;
  // @Input() suppr:boolean;
  img: any;
  allData: any;
  suppr: boolean;
 
  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };
  constructor(private socialSharing: SocialSharing, private modalController: ModalController, public popoverController: PopoverController, private navParams: NavParams, public actionSheetController: ActionSheetController) {

   }

  ngOnInit() {
	 this.img   = this.navParams.get('img');
     this.allData   = this.navParams.get('allData');
     this.suppr   = this.navParams.get('suppr');
  }
  
   zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }
 
  close() {
    this.modalController.dismiss();
  }
  
  
  
    async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ListeServicePage,
      event: ev,
       mode: 'ios',
	   componentProps: {		
		allData : this.allData
      }	 
    });
    return await popover.present();
  }
  
    openPreview() {
    this.modalController.create({
      component: ListeServicePage
    }).then(modal => {
      modal.present();
    });
  }
  
     async presentActionSheet() {
		 let u = this;
		 let Personnel = (this.allData.person_tel_perso) ? this.allData.person_tel_perso : 'Aucun';
		 let Professionnel = (this.allData.person_tel_profe) ? this.allData.person_tel_profe : 'Aucun';
		 let email = (this.allData.person_email)  ? this.allData.person_email : 'Aucun';
		 let siteW = "";
		if(this.allData.id_entrep == -1){
			siteW = (this.allData.person_site_web) ? this.allData.person_site_web : 'Aucun';
			 
		 }else{
		  siteW = (this.allData.entreprise_site_web) ? this.allData.entreprise_site_web : 'Aucun';
			 
		 }
    const actionSheet = await this.actionSheetController.create({
      header: 'Plus d\'options',
      buttons: [{
        text: Personnel,
        icon: 'call',
		cssClass: 'button-cam',
        handler: () => {
			if(Personnel !== 'Aucun'){				
				  
				  window.location.href='tel:'+Personnel;
			}else{
				alert("Action non autoriser !");
			}
        }
      },{
        text: Professionnel,
        icon: 'call',
        handler: () => {
			if(Professionnel !== 'Aucun'){				
				  
				  window.location.href='tel:'+Professionnel;
			}else{
				alert("Action non autoriser !");
			}          
        }
      },{
        text: email,
        icon: 'mail',
        handler: () => {
 			if(email !== 'Aucun'){				
				  
				  window.location.href='mailto:'+email;
			}else{
				alert("Action non autoriser !");
			}          
        }
      },{
        text: siteW,
        icon: 'git-network',
        handler: () => {
 			if(siteW !== 'Aucun'){				
				  
				  window.location.href=siteW;
				  
			}else{
				alert("Action non autoriser !");
			}           
        }
      },{
        text: 'Signaler un problème',
        icon: 'bug',
        handler: () => {
						u.openPreview();
        }
      },{
        text: 'Fermer',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

    share(event) {
		let linkShare = "hhhhhhhhhh";
        this.socialSharing.share(linkShare)
            .then(() => {
                console.log(event);
            }).catch(() => {
				

        });
		
    }
	
}
