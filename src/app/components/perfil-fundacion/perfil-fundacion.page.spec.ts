import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFundacionPage } from './perfil-fundacion.page';

describe('PerfilFundacionPage', () => {
  let component: PerfilFundacionPage;
  let fixture: ComponentFixture<PerfilFundacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilFundacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFundacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
