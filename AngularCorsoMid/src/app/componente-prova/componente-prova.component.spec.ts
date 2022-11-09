import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteProvaComponent } from './componente-prova.component';

describe('ComponenteProvaComponent', () => {
  let component: ComponenteProvaComponent;
  let fixture: ComponentFixture<ComponenteProvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteProvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
