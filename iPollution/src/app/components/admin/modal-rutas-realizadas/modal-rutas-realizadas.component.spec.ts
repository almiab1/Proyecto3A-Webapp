import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRutasRealizadasComponent } from './modal-rutas-realizadas.component';

describe('ModalRutasRealizadasComponent', () => {
  let component: ModalRutasRealizadasComponent;
  let fixture: ComponentFixture<ModalRutasRealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRutasRealizadasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRutasRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
