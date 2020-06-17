import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';
import { EstabelecimentoService } from 'src/app/services/domain/estabelecimento.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { PhotoService } from '../services/photo.service';
import { ImageUtilService } from '../services/domain/image-util.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProdutoService } from '../services/domain/produtoServico.service';


@Component({
  selector: 'app-gerenciar-estabelecimento',
  templateUrl: './gerenciar-estabelecimento.page.html',
  styleUrls: ['./gerenciar-estabelecimento.page.scss'],
})
export class GerenciarEstabelecimentoPage implements OnInit {
  sliderOpts = {
    zoom: false,
    slidesPerView: 4,
    centeredSlides: false,
    spaceBeetween: 10
  };
  estabelecimento: EstabelecimentoDTO;
  edit: boolean = false;
  telefone1: string = "";
  telefone2: string = "";
  telefone3: string = "";
  image;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estabelecimentoService: EstabelecimentoService,
    public photoService: PhotoService,
    public imageUtils: ImageUtilService,
    public sanitizer: DomSanitizer,
    public produtoServicoService: ProdutoService) {

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
              this.getImageOfProdutoServicoIfExists();
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
  
  setTelefones() {
    console.log(this.estabelecimento.telefones.length)
    this.telefone1 = this.estabelecimento.telefones[0];
    if (this.estabelecimento.telefones.length == 2) {
      this.telefone2 = this.estabelecimento.telefones[1];
    }
    if (this.estabelecimento.telefones.length == 3) {
      this.telefone3 = this.estabelecimento.telefones[2];
    }
  }
  editar() {
    this.edit = true;
  }

  cancelarEdicao() {
    this.edit = false;
  }

  deletePicture() {
    this.estabelecimentoService.deletePicture(this.estabelecimento.id)
      .subscribe(response => {
        this.image = '/assets/img/imagem.jpg';
      },
        error => {
          this.getImageOfEstabelecimentoIfExists();
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

  getImageOfEstabelecimentoIfExists() {
    this.estabelecimentoService.getImageFromServer(this.estabelecimento.id)
      .subscribe(response => {
        this.imageUtils.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.image = this.sanitizer.bypassSecurityTrustUrl(str);
        }
        );
      },
        error => {
          this.image = '/assets/img/imagem.jpg';
        }
      );
  }

  getImageOfProdutoServicoIfExists() {
    for (let i = 0; i < this.estabelecimento.produtoServicos.length; i++) {
      let ps = this.estabelecimento.produtoServicos[i];
      this.produtoServicoService.getImageFromServer(ps.id)
        .subscribe(response => {
          ps.imageUrl = `${API_CONFIG.baseUrl}/imagens/pro${ps.id}.jpg`;
        },
          error => {
            ps.imageUrl = '/assets/img/sem_foto.png';
          }
        );
    }
  }

  public async getCameraPicture() {
    var photo = await this.photoService.getCameraPicture();
    await this.sendPicture(photo);
  }

  sendPicture(picture) {
    this.estabelecimentoService.upLoadPicture(picture, this.estabelecimento.id)
      .subscribe(response => {
        this.getImageOfEstabelecimentoIfExists();
      },
        error => { }
      );
  }
}
