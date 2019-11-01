import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-detail-item',
  templateUrl: './list-detail-item.component.html',
  styleUrls: ['./list-detail-item.component.scss']
})
export class ListDetailItemComponent implements OnInit {
  @Input() item: any;
  @Input() caption: string;

  constructor() { }

  ngOnInit() {
  }

}
