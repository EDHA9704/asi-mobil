import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogloginComponent } from './dialoglogin.component';

describe('DialogloginComponent', () => {
  let component: DialogloginComponent;
  let fixture: ComponentFixture<DialogloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogloginComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
