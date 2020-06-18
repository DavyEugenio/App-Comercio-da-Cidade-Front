import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { EstabelecimentoDTO } from 'src/app/models/estabelecimento.dto';
import { EnderecoDTO } from 'src/app/models/endereco.dto';
import { CidadeDTO } from 'src/app/models/cidade.dto';
import { EstabelecimentoService } from 'src/app/services/domain/estabelecimento.service';
import { PhotoService } from 'src/app/services/photo.service';
import { CidadeService } from 'src/app/services/domain/cidade.service';
import { API_CONFIG } from 'src/app/config/api.config';


@Component({
  selector: 'app-gerenciar-estabelecimento',
  templateUrl: './gerenciar-estabelecimento.page.html',
  styleUrls: ['./gerenciar-estabelecimento.page.scss'],
})
export class GerenciarEstabelecimentoPage implements OnInit {
  estabelecimento: EstabelecimentoDTO;
  edit: boolean = false;
  editEndereco: boolean = false;
  telefone1: string = " ";
  telefone2: string = " ";
  telefone3: string = " ";

  // edicao do endereco
  endereco: EnderecoDTO;
  cidades: CidadeDTO[];
  cidadeSelecionada: string;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estabelecimentoService: EstabelecimentoService,
    private cidadeService: CidadeService,
    public photoService: PhotoService) {

    this.cidades = this.cidadeService.findAll();

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
              this.getTelefones();
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
    let telefones = [];
    telefones.push(this.telefone1);
    if (this.telefone2 !== " "){
      telefones.push(this.telefone2);
    }
    if (this.telefone3 !== " "){
      telefones.push(this.telefone3);
    }
    this.estabelecimento.telefones = telefones;
    console.log(this.estabelecimento.telefones);
  }

  getTelefones() {
    console.log(this.estabelecimento.telefones.length)
    this.telefone1 = this.estabelecimento.telefones[0];
    if (this.estabelecimento.telefones.length == 2){
      this.telefone2 = this.estabelecimento.telefones[1];
    }
    if (this.estabelecimento.telefones.length == 3){
      this.telefone3 = this.estabelecimento.telefones[2];
    }
  }
  editarEstabelecimento() {
    this.edit = true;
  }
  confirmarEdicaoEstabelecimento(){
    this.setTelefones();
    this.estabelecimentoService.update(this.estabelecimento, this.estabelecimento.id)
    .subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
  }
  cancelarEdicaoEstabelecimento() {
    this.edit = false;
  }

  editarEndereco(endereco: EnderecoDTO) {
    console.log("endereco: ");
    console.log(endereco);
    this.edit =false;
    this.endereco = endereco;
    this.cidadeSelecionada = endereco.cidade.id.toString();
    console.log("cidade cidadeSelecionada: "+this.cidadeSelecionada);
    this.editEndereco = true;
  }
  confirmarEdicaoEndereco(){
    this.endereco.cidade = this.findCidade(this.cidadeSelecionada);
    //this.estabelecimento.endereco = this.endereco;
    console.log(this.endereco);

    this.estabelecimentoService.updateAddress(this.endereco, this.estabelecimento.id)
    .subscribe(
      response=>{
        console.log("OK");
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );

  }
  cancelarEdicaoEndereco(){
    this.editEndereco = false;
    this.edit =true;
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

  findCidade(id: string) {
    for (let i = 0; i < this.cidades.length; i++) {
      if (this.cidades[i]['id'] == id) {
        return this.cidades[i];
      }

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
