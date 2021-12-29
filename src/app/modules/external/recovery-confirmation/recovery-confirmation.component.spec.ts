import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryConfirmationComponent } from './recovery-confirmation.component';

describe('RecoveryConfirmationComponent', () => {
  let component: RecoveryConfirmationComponent;
  let fixture: ComponentFixture<RecoveryConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
