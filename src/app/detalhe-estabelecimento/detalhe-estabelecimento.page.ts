import { ProdutoService } from 'src/app/services/domain/produtoServico.service';
import { ProdutoServicoDTO } from 'src/app/models/produtoServico.dto';
import { API_CONFIG } from 'src/app/config/api.config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstabelecimentoService } from 'src/app/services/domain/estabelecimento.service';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';

@Component({
  selector: 'app-detalhe-estabelecimento',
  templateUrl: './detalhe-estabelecimento.page.html',
  styleUrls: ['./detalhe-estabelecimento.page.scss'],
})
export class DetalheEstabelecimentoPage implements OnInit {
  estabelecimento: EstabelecimentoDTO;
  produtoServicos: ProdutoServicoDTO[] = [];
  sliderOpts = {
    zoom: false,
    slidesPerView: 4,
    centeredSlides: false,
    spaceBeetween: 10
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estabelecimentoService: EstabelecimentoService,
    private produtoServicoService: ProdutoService) {

    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        let a = getNav.extras.state.estabelecimentoID;
        this.estabelecimentoService.findById(getNav.extras.state.estabelecimentoID)
          .subscribe(
            response => {
              this.estabelecimento = response;
              this.findProdutoServicos(this.estabelecimento.id);
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

  findProdutoServicos(id: string) {
    this.produtoServicoService.findByEstablishment(this.estabelecimento.id)
      .subscribe(response => {
        this.produtoServicos = response;
        this.getImageOfProdutoServicoIfExists();
      }
      );
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

  getImageOfProdutoServicoIfExists() {
    for (let i = 0; i < this.produtoServicos.length; i++) {
      let ps = this.produtoServicos[i];
      this.estabelecimentoService.getImageFromServer(ps.id)
        .subscribe(response => {
          ps.imageUrl = `${API_CONFIG.baseUrl}/imagens/pro${ps.id}.jpg`;
        },
          error => {
            ps.imageUrl = '/assets/img/imagem.jpg';
          }
        );
    }
  }
}
