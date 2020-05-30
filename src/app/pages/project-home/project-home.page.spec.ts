import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHomePage } from './project-home.page';

describe('ProjectHomePage', () => {
  let component: ProjectHomePage;
  let fixture: ComponentFixture<ProjectHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
