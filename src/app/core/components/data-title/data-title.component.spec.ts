import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTitleComponent } from './data-title.component';

describe('DataTitleComponent', () => {
  let component: DataTitleComponent;
  let fixture: ComponentFixture<DataTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
