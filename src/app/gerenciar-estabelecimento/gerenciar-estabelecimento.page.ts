import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';
import { EstabelecimentoService } from 'src/app/services/domain/estabelecimento.service';
import { API_CONFIG } from 'src/app/config/api.config';


@Component({
  selector: 'app-gerenciar-estabelecimento',
  templateUrl: './gerenciar-estabelecimento.page.html',
  styleUrls: ['./gerenciar-estabelecimento.page.scss'],
})
export class GerenciarEstabelecimentoPage implements OnInit {
  estabelecimento: EstabelecimentoDTO;
  edit: boolean = false;
  telefone1: string = "";
  telefone2: string = "";
  telefone3: string = "";

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estabelecimentoService: EstabelecimentoService) {

    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        console.log(getNav.extras.state.estabelecimentoID);
        this.estabelecimentoService.findById(getNav.extras.state.estabelecimentoID)
          .subscribe(
            response => {
              this.estabelecimento = response; 
              console.log(this.estabelecimento);  
              this.getImageOfEstabelecimentoIfExists();   
              this.setTelefones();
            },
            error => {
            }
          );
      }
    });


  }

  ngOnInit() {
  }
  setTelefones(){
    console.log(this.estabelecimento.telefones.length)
    this.telefone1 = this.estabelecimento.telefones[0];
    if (this.estabelecimento.telefones.length == 2){
      this.telefone2 = this.estabelecimento.telefones[1];
    }
    if (this.estabelecimento.telefones.length == 3){
      this.telefone3 = this.estabelecimento.telefones[2];
    }
  }
  editar(){
    this.edit = true;
  }

  cancelarEdicao() {
    this.edit = false;
  }

  getImageOfEstabelecimentoIfExists() {
    this.estabelecimentoService.getImageFromServer(this.estabelecimento.id)
      .subscribe(response => {
        this.estabelecimento.imageUrl = `${API_CONFIG.baseUrl}/imagens/est${this.estabelecimento.id}.jpg`;
      },
        error => {
          this.estabelecimento.imageUrl = '/assets/img/imagem.jpg';
        }
      );
  }

  addProdutoServico() {
    let dados: NavigationExtras = {
      state: {
        estabelecimentoID: this.estabelecimento.id
      }
    };
    this.router.navigate(['tabs/add-produto-servico'], dados);
  }
}
