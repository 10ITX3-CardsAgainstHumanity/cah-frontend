import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CahNewGameDialogComponent} from './cah-new-game-dialog.component';

describe('CahNewGameDialogComponent', () => {
  let component: CahNewGameDialogComponent;
  let fixture: ComponentFixture<CahNewGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahNewGameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahNewGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
