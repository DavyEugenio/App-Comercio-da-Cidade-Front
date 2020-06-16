import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CidadeService } from 'src/app/services/domain/cidade.service';
import { CidadeDTO } from 'src/app/models/cidade.dto';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cidadeSelecionada: string;
  cidades: CidadeDTO[];

  constructor(private router: Router,
    private cidadeService: CidadeService,
    private storage: StorageService) {

  }

  ngOnInit() {
    let localCidade = this.storage.getLocalCidade();
    
    if (localCidade == null) {
      this.cidades = this.cidadeService.findAll();
      this.cidadeSelecionada = "1";
      console.log(this.cidades);

    }
    else {
      this.router.navigate(['./tabs']);
    }

  }

  setCidade() {
    let dados: NavigationExtras = {
      state: {
        cidade: this.findCidade(this.cidadeSelecionada)
      }
    };

    
    console.log(this.findCidade(this.cidadeSelecionada));
    this.router.navigate(['./tabs'], dados);
  }

  findCidade(id: string) {
    for (let i = 0; i < this.cidades.length; i++) {
      if (this.cidades[i]['id'] == id) {
        return this.cidades[i];
      }

    }

  }

}
