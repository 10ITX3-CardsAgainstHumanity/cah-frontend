import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahGameRoomComponent } from './cah-game-room.component';

describe('CahGameRoomComponent', () => {
  let component: CahGameRoomComponent;
  let fixture: ComponentFixture<CahGameRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahGameRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahGameRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
