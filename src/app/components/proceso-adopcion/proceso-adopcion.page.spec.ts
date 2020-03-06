import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoAdopcionPage } from './proceso-adopcion.page';

describe('ProcesoAdopcionPage', () => {
  let component: ProcesoAdopcionPage;
  let fixture: ComponentFixture<ProcesoAdopcionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoAdopcionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoAdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
