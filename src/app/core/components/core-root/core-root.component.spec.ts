import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoreRootComponent} from './core-root.component';

describe('CoreRootComponent', () => {
  let component: CoreRootComponent;
  let fixture: ComponentFixture<CoreRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
