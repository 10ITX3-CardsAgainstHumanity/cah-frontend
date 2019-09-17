import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahJoinGameDialogComponent } from './cah-join-game-dialog.component';

describe('CahJoinGameDialogComponent', () => {
  let component: CahJoinGameDialogComponent;
  let fixture: ComponentFixture<CahJoinGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahJoinGameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahJoinGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
