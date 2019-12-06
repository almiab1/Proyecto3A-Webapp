import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NodosPage } from './nodos.page';

describe('NodosPage', () => {
  let component: NodosPage;
  let fixture: ComponentFixture<NodosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NodosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
