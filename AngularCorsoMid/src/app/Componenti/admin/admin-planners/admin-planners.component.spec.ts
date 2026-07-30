import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlannersComponent } from './admin-planners.component';

describe('AdminPlannersComponent', () => {
  let component: AdminPlannersComponent;
  let fixture: ComponentFixture<AdminPlannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
