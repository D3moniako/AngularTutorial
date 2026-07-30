import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlannersComponent } from './my-planners.component';

describe('MyPlannersComponent', () => {
  let component: MyPlannersComponent;
  let fixture: ComponentFixture<MyPlannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
