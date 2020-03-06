import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundacionesPage } from './fundaciones.page';

describe('FundacionesPage', () => {
  let component: FundacionesPage;
  let fixture: ComponentFixture<FundacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
