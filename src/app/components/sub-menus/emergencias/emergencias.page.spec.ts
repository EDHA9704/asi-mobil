import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenciasPage } from './emergencias.page';

describe('EmergenciasPage', () => {
  let component: EmergenciasPage;
  let fixture: ComponentFixture<EmergenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
