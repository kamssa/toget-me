import {Component, OnInit, ViewChild} from '@angular/core';
import {MbscCardOptions} from '@mobiscroll/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ModeleService} from '../services/modele.service';
import {IonInfiniteScroll, AlertController, ToastController, LoadingController} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ValiderTokenService} from '../services/valider-token.service';
import {Storage} from '@ionic/storage';
import {RegisterService} from '../services/register.service';
import {Objet} from '../models/objet';
import {BehaviorSubject} from 'rxjs';
// import { Storage } from '@ionic/storage';
const DATA_KEY = 'access_data';
const TOKEN_KEY = 'access_token';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.page.html',
    styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    modeles: any;
    messageErreur: string;
    search: any;
    user: any;
    type: any;
    id_personne: any;
    id_user: any;
    objet: any = '';
    content:any;
    verifierRetour = new BehaviorSubject(false);


    cardSettings: MbscCardOptions = {
        theme: 'ios'
    };
    message: string = null;
    file: string = null;
    link: string = null;
    subject: string = null;
	uploaded:boolean;
	uploaded_val:any;
	toogleclassElement = true;
	toogleclassElementAFF = false;
	service:any=[];
	serviceLoading = true;
	userFilter:any={person_service : ''};
    constructor(private route: ActivatedRoute,
                private router: Router,
                private  modeleService: ModeleService,
                private  registerService: RegisterService,
                private socialSharing: SocialSharing,
                private validerToken: ValiderTokenService,
                private storage: Storage,
                private alertCtrl: AlertController,
                private toastController: ToastController,
                private loadingCtl: LoadingController) {
        /* this.initializeApp();
         console.log('verification du collection ave c les routes');
         this.enregistrer();*/
        
    }
    loadData(event) {
		let u= this;
        setTimeout(() => {
           this.messageErreur="plus de carte";
            event.target.complete();
			// u.modeleService.getUpload();

            if (this.modeles.length == 1000) {
                event.target.disabled = true;
            }
        }, 500);
		
    }
    ionViewWillEnter(){
        let u=this;
            u.toogleclassElementAFF = true;
            // this.modeleService.getUpload();
            this.route.queryParams.subscribe(res => {
                if (!res) {
                        u.serviceLoading = false;
                    // console.log('pas de paremetre');
                } else {
                    this.search = res['search'];
                    this.type = res['type'];
   
   
                    switch (this.type) {
                        case  'entreprise':
   
    this.modeleService.searchE(this.search).subscribe(response => {
                                //console.log('afficher le reour de collection' + response['data']);
   
                                   this.modeles = response;
                                   this.service = response['service'];
                                   // console.log(this.service);
                                   if(response['data'].length > 0){
                                    this.showLoading();
                                           u.serviceLoading = false;
                                           this.verifierRetour.next(true);
                                       if (document && document.readyState === 'complete') {
                                           u.natiSHow();
                                            // u.loadFilterData('',0);
                                       }
                                   }
                            },error=>{
                                this.presentAlertVerifierConnexion("Désolé", "Verifier votre connexion");
                                u.serviceLoading = false;});
                            setTimeout(()=>{u.serviceLoading = false;},3000);
                            break;
                        case  'particulier':
                        this.toogleclassElementAFF = false;
                            this.modeleService.searchP(this.search).subscribe(response => {
                                // console.log('afficher le reour de collection status' + response['status']);
                                if (response['status']===200) {
                                    this.showLoading();
                                    this.modeles = response;
                                    this.modeleService.messageErreur;
                                    this.verifierRetour.next(true);
                                    u.serviceLoading = false;
                                }
   
   
   
                            },error=>{
                                this.presentAlertVerifierConnexion("Désolé", "Verifier votre connexion");
                                u.serviceLoading = false;});
   
                            break;
                            case  '':
                            this.toogleclassElementAFF = false;
                                this.modeleService.searchAll('').subscribe(response => {
                                    if (response['status']===200) {
                                        this.showLoading();
                                        this.modeles = response;
                                        this.modeleService.messageErreur;
                                        this.verifierRetour.next(true);
                                        u.serviceLoading = false;
                                    }
   
                                },error=>{
                                    this.presentAlertVerifierConnexion("Désolé", "Verifier votre connexion");
                                    u.serviceLoading = false;});
                             break
                        default:
                        this.toogleclassElementAFF = false;
                            this.modeleService.searchAll(this.search).subscribe(response => {
                                if (response['status']===200) {
                                    this.showLoading();
                                    this.modeles = response;
                                    this.modeleService.messageErreur;
                                    this.verifierRetour.next(true);
                                    u.serviceLoading = false;
                                }
                            },error=>{
                                this.presentAlertVerifierConnexion("Désolé", "Verifier votre connexion");
                                u.serviceLoading = false;});
   
                            break;
   
                    }
                }
            },error=>{u.serviceLoading = false;});
   
    }
    // methode lancée au demarrage de la classe
    ngOnInit() {
		
    }
	loadFilterData(param, id){
		this.userFilter.person_service = param;
		this.tooglebox();	
		let elClass = document.getElementsByClassName("element_");
		for (let index = 0; index < elClass.length; ++index) {
			elClass[index].setAttribute('color', 'light');
		}
		// elClass.setAttribute('color', 'primary');
		let el = document.getElementById("element_"+id);
		el.setAttribute('color', 'warning');
		
	}
    share(event) {
		// this.modeleService.getUpload();
        // console.log(event.value);
        this.socialSharing.share(event.value)
            .then(() => {
                console.log(event.value);
            }).catch(() => {

        });
    }

    valider() {
		// this.modeleService.getUpload();
        this.registerService.collection(this.objet).subscribe(resp => {
            this.modeles = resp;
           }, err => {
            console.log(err);
        });
    }


    enregistrer(event) {
		// this.modeleService.getUpload();
        this.storage.get(TOKEN_KEY).then(resp =>{
            if(!resp){
                this.presentAlertConnexion("Désolé", "Vous devez vous connecter d'abord");
            }
        });
        this.storage.get(DATA_KEY).then(data => {
            if (data) {
                this.user = data;
                this.id_user = data['id_user'];
                this.id_personne = event.value;
                this.objet = new Objet(this.id_user, this.id_personne, 1);
                this.registerService.collection(this.objet).subscribe(resp => {
                   if (resp['status']===200)
                    this.presentToast( "Carte ajoutée avec succes");

                   }, err => {
                    this.presentToast( "Erreur de connexion.");
                });
            }
        });


    }

     initializeApp() {
		 //this.modeleService.getUpload();
         this.validerToken.authenticationState.subscribe(state => {
      if(!state){
 // this.router.navigate(['/ma-collection']);
      } else {
   //       this.router.navigate(['/connexion']);
      }
  });
     }
     async presentAlert(title, text) {
        const alert = await this.alertCtrl.create({
          header: title,
          subHeader: text,
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Ok',
            handler: () => {

            }
          }]
        });
        await alert.present();
      }
      async presentAlertConnexion(title, text) {
        const alert = await this.alertCtrl.create({
          header: title,
          subHeader: text,
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Ok');
              this.router.navigate(['/connexion']);
              
            }
          }]
        });
    
        await alert.present();
      }
      async presentAlertVerifierConnexion(title, text) {
        const alert = await this.alertCtrl.create({
          header: title,
          subHeader: text,
          
        });
    
        await alert.present();
      }
    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();

    }
	
	natiSHow(){
		// document.addEventListener('readystatechange', ()=>{
			// console.log('Charge');
		let elemContent = document.getElementById("ctt-content");
		let nativestogetc:any = document.getElementById("nativetogetc");

			
				if(elemContent.offsetHeight > 0){
						// alert(elemContent.offsetHeight);
						nativestogetc.style.marginTop = elemContent.offsetHeight+"px";
				}else{
						// alert(elemContent.offsetHeight);
						nativestogetc.style.marginTop = "0px";
				}

		
		
		  // });
	}
	
	tooglebox(){
		let nativestogetc:any = document.getElementById("nativetogetc");
		let elemContent = document.getElementById("ctt-content");
		let elem = document.getElementById("box-ctt");
		elem.classList.toggle('hide');
		this.toogleclassElement = elem.classList.contains("hide")
		
		if(elemContent.offsetHeight > 0){
			
				nativestogetc.style.marginTop = elemContent.offsetHeight+"px";
		}else{
				nativestogetc.style.marginTop = "0px";
		}
    }
    async showLoading(){
        let loading = await this.loadingCtl.create({
            message:"Chargement...",
            duration: 2000,
            showBackdrop: false,
            spinner: "lines-small"
        });
        loading.present().then(() => {
            if (this.verifierRetour.value){
             loading.dismiss();
            }
        });


    }
}
