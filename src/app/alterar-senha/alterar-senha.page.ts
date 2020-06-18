import { Component, OnInit } from '@angular/core';
import { SenhaUpdateDTO } from 'src/app/models/senhaUpdate.dto';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {
	update: SenhaUpdateDTO;
	antigaSenha: string = "";
	novaSenha: string = "";
	confirmarNovaSenha: string = "";

  constructor(
  						private usuarioService: UsuarioService,
  						public alertCtrl: AlertController,
  						private router: Router) {}

  ngOnInit() {
  }

  alterar() {
  	console.log(this.antigaSenha);
  	console.log(this.novaSenha);
  	if ( this.novaSenha == this.confirmarNovaSenha) {
  		this.update = {
  			senhaNova: this.novaSenha,
    		senhaAntiga: this.antigaSenha
  		}
  		console.log(this.update);
  		this.usuarioService.updatePassword(this.update)
  		.subscribe(
  			response=>{
  				console.log(response);
  				this.successfully();
  			},
  			error=>{
  				console.log(error);

  			}
  		);
  	}else{
  		console.log("As senhas não coincidem");
 
  	}
  }
  async successfully() {
  	const alert = await this.alertCtrl.create({
      header: 'Senha alterada com sucesso!!',
      backdropDismiss: false,
      buttons: [{
          text: 'Ok',
          handler: data => {
          	this.router.navigate(['./profile']);
        	}
      }]

  });
  await alert.present();
  
  }
}
