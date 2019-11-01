import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGridCellComponent } from './detail-grid-cell.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailGridCellComponent', () => {
  let component: DetailGridCellComponent;
  let fixture: ComponentFixture<DetailGridCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [DetailGridCellComponent]
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
