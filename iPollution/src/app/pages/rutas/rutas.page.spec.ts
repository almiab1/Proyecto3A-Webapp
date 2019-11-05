import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasPage } from './rutas.page';

describe('RutasPage', () => {
  let component: RutasPage;
  let fixture: ComponentFixture<RutasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
