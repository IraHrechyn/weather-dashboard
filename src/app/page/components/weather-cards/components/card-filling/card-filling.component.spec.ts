import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFillingComponent } from './card-filling.component';

describe('FillingCardComponent', () => {
  let component: CardFillingComponent;
  let fixture: ComponentFixture<CardFillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
