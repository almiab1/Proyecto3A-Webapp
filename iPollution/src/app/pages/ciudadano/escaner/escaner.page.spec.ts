import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscanerPage } from './escaner.page';

describe('EscanerPage', () => {
  let component: EscanerPage;
  let fixture: ComponentFixture<EscanerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscanerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscanerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
