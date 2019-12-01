import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CoreRootComponent} from './core-root.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('CoreRootComponent', () => {
  let component: CoreRootComponent;
  let fixture: ComponentFixture<CoreRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreRootComponent ],
      imports: [ RouterTestingModule ]
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

  it('should display the router outlet', () => {
    expect()
  });
});
