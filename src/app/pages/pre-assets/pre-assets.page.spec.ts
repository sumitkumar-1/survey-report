import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAssetsPage } from './pre-assets.page';

describe('PreAssetsPage', () => {
  let component: PreAssetsPage;
  let fixture: ComponentFixture<PreAssetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreAssetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreAssetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
