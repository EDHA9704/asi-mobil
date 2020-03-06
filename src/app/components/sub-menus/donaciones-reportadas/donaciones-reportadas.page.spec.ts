import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionesReportadasPage } from './donaciones-reportadas.page';

describe('DonacionesReportadasPage', () => {
  let component: DonacionesReportadasPage;
  let fixture: ComponentFixture<DonacionesReportadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonacionesReportadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonacionesReportadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
