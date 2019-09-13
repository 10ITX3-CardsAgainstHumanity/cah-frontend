import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahScoreboardListComponent } from './cah-scoreboard-list.component';

describe('CahScoreboardListComponent', () => {
  let component: CahScoreboardListComponent;
  let fixture: ComponentFixture<CahScoreboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahScoreboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahScoreboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
