import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddProdutoServicoPage } from './add-produto-servico.page';

describe('AddProdutoServicoPage', () => {
  let component: AddProdutoServicoPage;
  let fixture: ComponentFixture<AddProdutoServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProdutoServicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProdutoServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
