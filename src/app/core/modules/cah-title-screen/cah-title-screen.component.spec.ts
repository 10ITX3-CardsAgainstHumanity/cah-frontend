import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahTitleScreenComponent } from './cah-title-screen.component';

describe('CahTitleScreenComponent', () => {
  let component: CahTitleScreenComponent;
  let fixture: ComponentFixture<CahTitleScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahTitleScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahTitleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to false on default', () => {
    expect(component.isLoading).toBeFalsy();
  });

  it('should ', function () {

  });
});
