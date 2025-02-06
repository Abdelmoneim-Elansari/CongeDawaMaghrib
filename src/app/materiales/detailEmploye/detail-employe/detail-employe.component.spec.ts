import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmployeComponent } from './detail-employe.component';

describe('DetailEmployeComponent', () => {
  let component: DetailEmployeComponent;
  let fixture: ComponentFixture<DetailEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailEmployeComponent]
    });
    fixture = TestBed.createComponent(DetailEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
