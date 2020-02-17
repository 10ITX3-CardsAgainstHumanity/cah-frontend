import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CahPlayerHandComponent} from './cah-player-hand.component';

describe('CahPlayerHandComponent', () => {
  let component: CahPlayerHandComponent;
  let fixture: ComponentFixture<CahPlayerHandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahPlayerHandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahPlayerHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
