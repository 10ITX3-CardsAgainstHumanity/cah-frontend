import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {CahGameRoomComponent} from './cah-game-room.component';
import {ElementRef} from '@angular/core';

describe('CahGameRoomComponent', () => {
  let component: CahGameRoomComponent;
  let fixture: ComponentFixture<CahGameRoomComponent>;
  let nativeElement: ElementRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CahGameRoomComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahGameRoomComponent);
    component = fixture.debugElement.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
