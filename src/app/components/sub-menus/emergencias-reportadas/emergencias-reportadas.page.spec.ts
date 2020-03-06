import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenciasReportadasPage } from './emergencias-reportadas.page';

describe('EmergenciasReportadasPage', () => {
  let component: EmergenciasReportadasPage;
  let fixture: ComponentFixture<EmergenciasReportadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenciasReportadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenciasReportadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
