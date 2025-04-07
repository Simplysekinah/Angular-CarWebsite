import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehincleComponent } from './vehincle.component';

describe('VehincleComponent', () => {
  let component: VehincleComponent;
  let fixture: ComponentFixture<VehincleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehincleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehincleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
