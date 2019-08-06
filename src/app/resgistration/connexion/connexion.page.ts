import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {UserModel} from '../../models/user.model';
import { Router } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import {MessageAlerteService} from '../../services/message-alerte.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
    private  user: UserModel;
    password: string = '';
    passwordShow: boolean = false;
    tooltipsMessage: string ='';

    connexionForm = this.fb.group({
        login: ['', Validators.required ],
        password: ['', Validators.required ],
    });
  constructor(
    private auth: RegisterService,
    private router: Router,
    private fb: FormBuilder,
    private storage: Storage,
    private messageAlerte: MessageAlerteService
	
    ) {
      this.togglePassword();

  }


  ngOnInit() {

  }
  public login() {
    
    this.auth.login(this.connexionForm.value).subscribe(data => {
       
        if (data['status'] === 200) {

                this.messageAlerte.presentToast("Connexion réussie",);

         } else {
            let message = this.user = data['message'];
            this.messageAlerte.presentAlert('', message);
            }
        },
        error => {
            console.log("erreur ");
        });
  }
  public togglePassword() {
      if (!this.passwordShow){
          this.passwordShow = true;
          this.password = 'password';
          this.tooltipsMessage = 'afficher';

      } else {
          this.passwordShow = false;
          this.password = '';
          this.tooltipsMessage = 'cacher';
      }

  }
  validation_messages = {


        'login': [
            { type: 'required', message: 'Ce champ est obligatoire.' },
            
        ],
        
        'password': [
            { type: 'required', message: 'Ce champ est obligatoire.' },
           
        ],

    };

}
