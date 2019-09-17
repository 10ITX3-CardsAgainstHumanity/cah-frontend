import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahRoomBadgeComponent } from './cah-room-badge.component';

describe('CahRoomBadgeComponent', () => {
  let component: CahRoomBadgeComponent;
  let fixture: ComponentFixture<CahRoomBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahRoomBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahRoomBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
