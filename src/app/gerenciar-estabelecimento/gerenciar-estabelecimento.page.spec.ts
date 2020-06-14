import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciarEstabelecimentoPage } from './gerenciar-estabelecimento.page';

describe('GerenciarEstabelecimentoPage', () => {
  let component: GerenciarEstabelecimentoPage;
  let fixture: ComponentFixture<GerenciarEstabelecimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarEstabelecimentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarEstabelecimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
