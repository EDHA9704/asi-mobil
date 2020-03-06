import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFinalPage } from './registro-final.page';

describe('RegistroFinalPage', () => {
  let component: RegistroFinalPage;
  let fixture: ComponentFixture<RegistroFinalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroFinalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
