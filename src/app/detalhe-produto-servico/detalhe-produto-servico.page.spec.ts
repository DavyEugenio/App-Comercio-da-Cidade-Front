import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalheProdutoServicoPage } from './detalhe-produto-servico.page';

describe('DetalheProdutoServicoPage', () => {
  let component: DetalheProdutoServicoPage;
  let fixture: ComponentFixture<DetalheProdutoServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheProdutoServicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheProdutoServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
