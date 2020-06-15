import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/domain/produtoServico.service';
import { ProdutoServicoDTO } from '../models/produtoServico.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-produto-servico',
  templateUrl: './add-produto-servico.page.html',
  styleUrls: ['./add-produto-servico.page.scss'],
})
export class AddProdutoServicoPage implements OnInit {

  produtoServico: ProdutoServicoDTO;
  estabelecimentoID: string;
  formGroup: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private produtoServicoService: ProdutoService,
    private formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.estabelecimentoID = getNav.extras.state.estabelecimentoID;
      }
    });
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      preco: [0.01, [Validators.required]],
      descricao: ['', [Validators.maxLength(120)]],
      estabelecimentoId: [this.estabelecimentoID]
    }
    );
  }

  ngOnInit() {
  }

  signupUser() {
    this.formGroup.controls.estabelecimentoId.setValue(this.estabelecimentoID);
    this.produtoServicoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => {
        }
      );
  }
  async showInsertOk() {
    let alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Produto adicionado com sucesso!',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.gerenciarEstabelecimento();
          }
        }
      ]
    });
    await alert.present();
  }

  gerenciarEstabelecimento() {
    let dados: NavigationExtras = {
      state: {
        estabelecimentoID: this.estabelecimentoID
      }
    };
    this.router.navigate(['tabs/gerenciar-estabelecimento'], dados);
  }
}
