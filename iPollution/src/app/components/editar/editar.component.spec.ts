import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: EditarComponent;
  let fixture: ComponentFixture<EditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
