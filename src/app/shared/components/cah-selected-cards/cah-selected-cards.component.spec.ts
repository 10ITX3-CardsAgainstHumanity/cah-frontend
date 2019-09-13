import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CahSelectedCardsComponent } from './cah-selected-cards.component';

describe('CahSelectedCardsComponent', () => {
  let component: CahSelectedCardsComponent;
  let fixture: ComponentFixture<CahSelectedCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CahSelectedCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CahSelectedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
