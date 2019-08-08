import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Platform} from '@ionic/angular';
import {EntreprisePage} from '../../entreprise/entreprise.page';
import {OutilService} from '../../parametre/outil.service';
@Component({
  selector: 'app-modele-carte',
  templateUrl: './modele-carte.component.html',
  styleUrls: ['./modele-carte.component.scss'],
})
export class ModeleCarteComponent implements OnInit {

  @Input('_id') _id: number;
  @Input('_id_col') _id_col: number;
  @Input('code') code : string;
  @Input('logo') logo: string;
  @Input('activite_societe') activite_societe: string;
  @Input('nom_entreprise') nom_entreprise: string;
  @Input('slogan') slogan: string;
  @Input('nom') nom: string;
  @Input('prenom') prenom: string;
  @Input('fonction') fonction: string;
  @Input('boite_postal') boite_postal: string;
  @Input('adresse') adresse: string;
  @Input('site_web') site_web: string;
  @Input('email') email: string;
  @Input('telphone') telphone: string;
  @Input('portable') portable: string;
  @Input('couleur_primary') couleur_primary: string;
  @Input('couleur_secondary') couleur_secondary: string;
  @Input('couleur_terty') couleur_terty: string;
  @Input('texte_primary') texte_primary: string;
  @Input('texte_secondary') texte_secondary: string;
  @Input('texte_terty') texte_terty: string;
  @Input('couleur_fond') couleur_fond: string;
  @Input('image_fond') image_fond: string;
  @Input('model_carte') model_carte: string;
  @Input('model_content') model_content: any;
  @Input('allData') allData: any;
  @Input('Verify') Verify: boolean;
  @Input('actionS') actionS: boolean;
  @Input('userFilter') userFilter:any={person_service : ''};
  @Output() share = new  EventEmitter<any>();
  @Output() ajouter = new  EventEmitter<any>();
  @Output() supprimer = new  EventEmitter<any>();
  link:any;
  tailleAll=0;
	public otp: any=[];
	public keysearch = 0;
	loading = true;
	
  constructor(private photoViewer: PhotoViewer,private platform: Platform, private modalController: ModalController, private outil : OutilService,
    private loadingCtl: LoadingController) { this.showLoading(); }

  ngOnInit() {
	  // this.tailleAll = this.allData.length;
		let u = this;
	  		// document.onload = (e)=>{
				
               // u.loading = false;
			   
            // };


			window.addEventListener("DOMContentLoaded", function(event) {
			u.loading = false;
			 // console.log('document - DOMContentLoaded - capture'); // 2nd
		});			
  }
  
  
  
      async showLoading(){
        let loading = await this.loadingCtl.create({
            message:"Chargement...",
            duration: 2000,
            showBackdrop: false,
            spinner: "lines-small"
        });
        loading.present().then(() => {
            if (this.loading == false){
             loading.dismiss();
            }
        });


    }
	
	
	converter(param:any){
	  let u= this;
	  let jsonStr = param.replace(/(\w+:)|(\w+ :)/g, function(s) {
		return '"' + s.substring(0, s.length-1) + '":';
				});
				if(jsonStr){
					
					  this.otp = JSON.parse(jsonStr);	
				}
	  return this.otp;  
	}
  onPartager(){
    this.link = 'http://192.168.8.200:8100/share/'+this._id+'/'+this.code;
    this.share.emit({value:this.link});

  }
  
  
  taille():any{
	  return this.allData.data.length;
  }
  onAjouter(){
    this.ajouter.emit({value:this._id});
   }

   ondelete(){
    this.supprimer.emit({value:this._id_col});
   }
   
   
    openPreview(img, allData:any={}, suppr=false) {
		this.outil.openPreview(img, allData, suppr);
  }

}
