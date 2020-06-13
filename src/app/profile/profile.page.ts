import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { PhotoService } from 'src/app/services/photo.service';

import { UsuarioDTO } from 'src/app/models/usuario.dto';
import { ImageUtilService } from 'src/app/services/domain/image-util.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario: UsuarioDTO;
  edit: boolean = false;
  profileImage;

  constructor(public storage: StorageService,
    public usuarioService: UsuarioService,
    public photoService: PhotoService,
    public imageUtils: ImageUtilService,
    public sanitizer: DomSanitizer,
    private router: Router,
    public auth: AuthService) {
    this.profileImage = '/assets/img/user.jpg';
  }

  ngOnInit() {

    let us = this.storage.getLocalUser();
    if (us && us.email) {
      this.usuarioService.findByEmail(us.email)
        .subscribe(
          response => {
            this.usuario = response;
            this.getImageOfUsuarioIfExists();
          },
          error => {
            if (error.status == 403) {
              this.router.navigate(['tabs/tab2']);
            }
          }
        );
    } else {
      this.router.navigate(['tabs/tab2']);
    }

  }

  gerenciarEstabelecimento(id: number) {
    console.log("id=" + id);

  }

  editarPerfil() {
    this.edit = true;
  }

  confirmarEdicao() {
    console.log(this.usuario);
    this.usuarioService.update(this.usuario).subscribe(
      response => {
        console.log(response);
      },
      error => {
      }
    );
    this.edit = false;
  }

  cancelarEdicao() {
    this.edit = false;
  }

  sair() {
    this.auth.logout();
    this.router.navigate(['tabs/tab2']);
  }

  getImageOfUsuarioIfExists() {
    this.usuarioService.getImageFromServer(this.usuario.id)
      .subscribe(response => {
        this.usuario.imageUrl = `${API_CONFIG.baseUrl}/imagens/usp${this.usuario.id}.jpg`;
        this.imageUtils.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        }
        );

      },
        error => {
          this.usuario.imageUrl = '/assets/img/user.jpg';
        }
      );
  }

  public async getCameraPicture() {
    var photo = await this.photoService.getCameraPicture();
    await this.sendPicture(photo);
  }

  sendPicture(picture) {
    this.usuarioService.upLoadPicture(picture, this.usuario.id)
      .subscribe(response => {
        this.getImageOfUsuarioIfExists();
      },
        error => { }
      );
  }

}
