import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title : string;

  constructor(){
    this.title =this.getTitle();
  }

  getTitle(): string{
    let result = 'appp worrks';
    return result;
  }
}
