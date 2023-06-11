import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalsInfoComponent } from './medals-info.component';

describe('MedalsInfoComponent', () => {
  let component: MedalsInfoComponent;
  let fixture: ComponentFixture<MedalsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedalsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedalsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
