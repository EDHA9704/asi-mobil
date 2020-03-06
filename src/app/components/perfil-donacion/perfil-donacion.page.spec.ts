import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDonacionPage } from './perfil-donacion.page';

describe('PerfilDonacionPage', () => {
  let component: PerfilDonacionPage;
  let fixture: ComponentFixture<PerfilDonacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDonacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDonacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
