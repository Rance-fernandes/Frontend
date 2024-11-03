import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPortalComponent } from './hr-portal.component';

describe('HrPortalComponent', () => {
  let component: HrPortalComponent;
  let fixture: ComponentFixture<HrPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
