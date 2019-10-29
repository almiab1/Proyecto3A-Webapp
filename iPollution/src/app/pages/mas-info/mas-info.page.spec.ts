import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasInfoPage } from './mas-info.page';

describe('MasInfoPage', () => {
  let component: MasInfoPage;
  let fixture: ComponentFixture<MasInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
