import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExcelPage } from './create-excel.page';

describe('CreateExcelPage', () => {
  let component: CreateExcelPage;
  let fixture: ComponentFixture<CreateExcelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExcelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExcelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
