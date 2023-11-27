import { Food } from './../../../../shared/models/food';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-confirmdelete',
  templateUrl: './confirmdelete.component.html',
  styleUrls: ['./confirmdelete.component.css']
})
export class ConfirmdeleteComponent {
  @Input() food: any;
  @Output() confirmDelete: EventEmitter<string> = new EventEmitter();
  constructor(private modalService: NgbModal) {
  }
  deleteFood() {
    this.confirmDelete.emit('delete');
    this.modalService.dismissAll();
  }
  Close() {
    this.modalService.dismissAll();
  }


}
