import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanerPage } from './scaner.page';

describe('ScanerPage', () => {
  let component: ScanerPage;
  let fixture: ComponentFixture<ScanerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
