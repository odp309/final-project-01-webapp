import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchReservationsComponent } from './branch-reservations.component';

describe('BranchReservationsComponent', () => {
  let component: BranchReservationsComponent;
  let fixture: ComponentFixture<BranchReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
