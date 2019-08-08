import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {NavParams, ModalController, IonInfiniteScroll, ToastController, LoadingController} from '@ionic/angular';
import { Slider } from '@mobiscroll/angular/src/js/classes/slider';
import { Router } from '@angular/router';
import { ModeleService } from '../services/modele.service';
import {Storage} from '@ionic/storage';
import { ValiderTokenService } from '../services/valider-token.service';
import {BehaviorSubject} from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
const  DATA_KEY = 'access_data';
const TOKEN_KEY = 'access_token';
@Component({
  selector: 'app-ma-collection',
  templateUrl: './ma-collection.page.html',
  styleUrls: ['./ma-collection.page.scss'],
})
export class MaCollectionPage implements OnInit {
  public modeles: any;
  public keyword: string;
    authenticationState = new BehaviorSubject(false);
    user: any;
    id_user: number;
    token:any;
    verifierRetour = new BehaviorSubject(false);

   @Input() filskeyword;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	userFilter:any={person_service : ''};
  constructor(
    private router: Router,
    private modelService: ModeleService,
    private socialSharing: SocialSharing ,
    private storage: Storage,
    private validerToken: ValiderTokenService,
    private toastController: ToastController,
    private loadingCtl: LoadingController
  ){
this.initializeApp();
this.showLoading();
  }
 recupererToken(){
   return   this.storage.get(TOKEN_KEY).then(token => {
         console.log('token recuperer dans le service valider token:', token);

         if (token) {
             this.token = token;
         }
     });

 }

  ngOnInit() {

      }

      
    loadData(event) {
      setTimeout(() => {
          console.log('plus de carte');
          event.target.complete();

          if (this.modeles.length == 1000) {
              event.target.disabled = true;
          }
      }, 500);
  }
  share(event) {
		this.modelService.getUpload();
        console.log(event.value);
        this.socialSharing.share(event.value)
            .then(() => {
                console.log(event.value); 
            }).catch(() => { 

        });
    }
    carteCollection() {
		this.modeles=[];
        this.storage.get(DATA_KEY).then(data => {
            if (data) {
                this.user = data;
                this.id_user = this.user['id_user'];
                this.modelService.searchCarte(this.id_user).subscribe(resp => {
                       if(resp['status'] === 200){
                           this.modeles = resp;
                           this.verifierRetour.next(true);
						   
						  
                       } else {
                          this.presentToast('Une erreur est survenue. Veuillez réessayer ');
                       }

                    },err => {
                        console.log(err);
                    });

            }
        });

    }
    initializeApp() {
        this.validerToken.authenticationState.subscribe(state => {
            if(state){
        this.carteCollection();
            } else {
                console.log('token expired');
            }
        });
    }
    async presentToast(text: string) {
        const toast = await this.toastController.create({
            message: text,
            duration: 2000
        });
        toast.present();

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
             
			  setTimeout(()=>{ loading.dismiss(); },5000);
            }
        });


    }
	
	
	supprimer(event) {
		// this.modeleService.getUpload();
        this.storage.get(TOKEN_KEY).then(resp =>{
            if(!resp){
                this.presentToast( "Une erreur est survenue !");
            }
        });
        this.storage.get(DATA_KEY).then(data => {
            if (data) {
                this.modelService.delete(event.value).subscribe(resp => {
                   if (resp['status']===200)
                    this.presentToast( "Carte supprimé avec succes");
					this.carteCollection();
                   }, err => {
                    this.presentToast( "Erreur de connexion.");
                });
            }
        });


    }
	
	
  }
