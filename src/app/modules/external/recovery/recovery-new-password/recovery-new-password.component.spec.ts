import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryNewPasswordComponent } from './recovery-new-password.component';

describe('RecoveryNewPasswordComponent', () => {
  let component: RecoveryNewPasswordComponent;
  let fixture: ComponentFixture<RecoveryNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
