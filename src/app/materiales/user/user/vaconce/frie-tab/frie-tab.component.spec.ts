import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrieTabComponent } from './frie-tab.component';

describe('FrieTabComponent', () => {
  let component: FrieTabComponent;
  let fixture: ComponentFixture<FrieTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrieTabComponent]
    });
    fixture = TestBed.createComponent(FrieTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
