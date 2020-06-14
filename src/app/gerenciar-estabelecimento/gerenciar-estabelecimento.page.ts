import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
            },
            error => {
            }
          );
      }
    });
  }

  ngOnInit() {
  }

  editar(){
    this.edit = true;
  }

  cancelarEdicao(){
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

}
