import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppliedJobsComponent } from './my-applied-jobs.component';

describe('MyAppliedJobsComponent', () => {
  let component: MyAppliedJobsComponent;
  let fixture: ComponentFixture<MyAppliedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAppliedJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
