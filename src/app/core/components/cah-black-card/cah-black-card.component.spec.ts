import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CahBlackCardComponent} from './cah-black-card.component';

describe('CahBlackCardComponent', () => {
  let component: CahBlackCardComponent;
  let fixture: ComponentFixture<CahBlackCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahBlackCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahBlackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
