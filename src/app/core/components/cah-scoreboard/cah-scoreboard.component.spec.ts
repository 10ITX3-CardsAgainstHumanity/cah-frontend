import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CahScoreboardComponent} from './cah-scoreboard.component';

describe('CahScoreboardComponent', () => {
  let component: CahScoreboardComponent;
  let fixture: ComponentFixture<CahScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahScoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
