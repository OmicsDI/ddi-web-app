import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.css']
})

export class DeleteButtonComponent implements OnInit {

    @Input() source: string;
    @Input() id: string;
    @Output() click = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    delete() {
        this.click.emit({source: this.source, id: this.id});
    }

}
