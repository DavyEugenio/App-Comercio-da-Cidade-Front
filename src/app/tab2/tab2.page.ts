import { AuthService } from 'src/app/services/auth.service';
import { CredenciaisDTO } from 'src/app/models/credenciais.dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(private router: Router,
    public auth: AuthService,
    public formBuilder: FormBuilder) { 

      this.formGroup=this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      });

    }

    formGroup: FormGroup;

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === "login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['tabs/profile']);
      }, error => {
      });
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['tabs/profile']);
      }, error => { });
  }

  signupUser(){
    console.log('Enviou o form');
  }

}
