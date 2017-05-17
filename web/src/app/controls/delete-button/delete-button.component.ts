import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {

  constructor() { }

  @Input() repository: string;
  @Input() accession: string;
  @Output() click = new EventEmitter();

  ngOnInit() {
  }

  delete(){
    this.click.emit(null);
  }

}
