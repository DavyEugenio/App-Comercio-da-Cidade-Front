import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  logado: boolean = false;
  constructor(public storage: StorageService) {
    let us = this.storage.getLocalUser();
    if (us && us.email) {
      this.logado = true;
    } else {
      this.logado = false;
    }
  }
}
