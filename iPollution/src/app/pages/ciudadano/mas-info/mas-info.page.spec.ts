import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasInfoPage } from './mas-info.page';

describe('MasInfoPage', () => {
  let component: MasInfoPage;
  let fixture: ComponentFixture<MasInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
