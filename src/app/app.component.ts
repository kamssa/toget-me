import { Component } from '@angular/core';

import {Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {Router} from '@angular/router';
import { RegisterService } from './services/register.service';
import {MessageAlerteService} from './services/message-alerte.service';
import {ValiderTokenService} from './services/valider-token.service';
const  TOKEN_KEY = 'access_token';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Accueil',
      url: 'tabs/accueil',
      icon: 'home'
    },
    {
      title: 'Collection',
      url: 'tabs/collection',
      icon: 'list'
    },
    {
      title: 'Faire une Demande',
      url: 'tabs/commentaire',
      icon: 'pricetag'
    },
    {
      title: 'Aide',
      url: 'tabs/aide',
      icon: 'help'
    }
  ];

public loading = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private  auth: RegisterService,
    private router: Router,
    private mesaageAlerte: MessageAlerteService,
    private validationToken: ValiderTokenService,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
	  let u = this;
	   // window.addEventListener("DOMContentLoaded", function(event) {
			// u.loading = false;
			 // console.log('document - DOMContentLoaded - capture'); // 2nd
		// });
			window.onload = (e)=>{
               u.loading = false;
            };	
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
        }, 5000);
    });
	


				
				
  }
  logout(){
     this.validationToken.authenticationState.subscribe(state=>{
       if (state){
         this.auth.logout();
         this.presentToast('déconnexion reussi');
         this.router.navigate(['tabs/accueil']);
       } else {
         // this.presentToast('vous devez vous connecter');
         this.router.navigate(['tabs/connexion']);

       }
     });

  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000
    });
    toast.present();

  }
}
