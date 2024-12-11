import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingCardComponent } from './filling-card.component';

describe('FillingCardComponent', () => {
  let component: FillingCardComponent;
  let fixture: ComponentFixture<FillingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillingCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FillingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
