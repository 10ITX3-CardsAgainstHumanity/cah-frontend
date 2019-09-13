import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahPlayerComponent } from './cah-player.component';

describe('CahPlayerComponent', () => {
  let component: CahPlayerComponent;
  let fixture: ComponentFixture<CahPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
