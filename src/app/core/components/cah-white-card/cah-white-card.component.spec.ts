import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CahWhiteCardComponent} from './cah-white-card.component';

describe('CahWhiteCardComponent', () => {
  let component: CahWhiteCardComponent;
  let fixture: ComponentFixture<CahWhiteCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahWhiteCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahWhiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
