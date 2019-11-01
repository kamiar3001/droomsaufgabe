import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGridCellComponent } from './detail-grid-cell.component';

describe('DetailGridCellComponent', () => {
  let component: DetailGridCellComponent;
  let fixture: ComponentFixture<DetailGridCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGridCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
