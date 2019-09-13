import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahScoreboardItemComponent } from './cah-scoreboard-item.component';

describe('CahScoreboardItemComponent', () => {
  let component: CahScoreboardItemComponent;
  let fixture: ComponentFixture<CahScoreboardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahScoreboardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahScoreboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
