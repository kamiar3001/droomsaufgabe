import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-grid-cell',
  templateUrl: './detail-grid-cell.component.html',
  styleUrls: ['./detail-grid-cell.component.scss']
})
export class DetailGridCellComponent {
  params: any;
  constructor(private router: Router) { }

  agInit(params: any): void {
    this.params = params;
  }

  goDetail() {
    this.router.navigate(['/detail'], { queryParams: { id: this.params.data.login } });
  }
}
