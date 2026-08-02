import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadPlannerComponent } from './admin-upload-planner.component';

describe('AdminUploadPlannerComponent', () => {
  let component: AdminUploadPlannerComponent;
  let fixture: ComponentFixture<AdminUploadPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUploadPlannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploadPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
