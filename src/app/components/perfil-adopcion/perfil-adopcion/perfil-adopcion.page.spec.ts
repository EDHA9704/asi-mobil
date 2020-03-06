import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdopcionPage } from './perfil-adopcion.page';

describe('PerfilAdopcionPage', () => {
  let component: PerfilAdopcionPage;
  let fixture: ComponentFixture<PerfilAdopcionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAdopcionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
