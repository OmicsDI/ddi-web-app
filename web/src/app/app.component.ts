import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title : string;

  constructor(private auth: AuthService){
    this.title =this.getTitle();
  }

  getTitle(): string{
    let result = 'appp worrks';
    return result;
  }
}
