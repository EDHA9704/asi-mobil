import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionesPage } from './donaciones.page';

describe('DonacionesPage', () => {
  let component: DonacionesPage;
  let fixture: ComponentFixture<DonacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
