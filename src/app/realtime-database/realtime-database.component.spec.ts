import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeDatabaseComponent } from './realtime-database.component';

describe('RealtimeDatabaseComponent', () => {
  let component: RealtimeDatabaseComponent;
  let fixture: ComponentFixture<RealtimeDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimeDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealtimeDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
