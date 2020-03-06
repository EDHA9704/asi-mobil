import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopcionesPage } from './adopciones.page';

describe('AdopcionesPage', () => {
  let component: AdopcionesPage;
  let fixture: ComponentFixture<AdopcionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopcionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
